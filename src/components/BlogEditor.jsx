import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { PenTool, Eye, Upload, FileText, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { db, storage } from '../firebase/Firebase'; // Adjust path to your firebase.js
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './BlogEditor.css';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (previewMode) return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }, { direction: 'rtl' }],
          ['link', 'image', 'video'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          ['blockquote', 'code-block'],
          ['clean'],
        ],
      },
      placeholder: 'Start writing your article...',
    });

    quill.on('text-change', () => {
      const html = quill.root.innerHTML;
      setContent(html);
      const text = quill.getText().trim();
      setWordCount(text.length > 0 ? text.split(/\s+/).length : 0);
    });

    quillRef.current = quill;

    const handleImageDrag = (e) => {
      e.target.style.opacity = '0.7';
      e.target.style.transform = 'scale(1.02)';
    };

    const handleImageDrop = (e) => {
      e.target.style.opacity = '1';
      e.target.style.transform = 'scale(1)';
    };

    const handleResize = (e, img) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = img.offsetWidth;
      const startHeight = img.offsetHeight;

      const doResize = (moveEvent) => {
        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);
        img.style.width = `${Math.max(100, newWidth)}px`;
        img.style.height = `${Math.max(100, newHeight)}px`;
      };

      const stopResize = () => {
        document.removeEventListener('mousemove', doResize);
        document.removeEventListener('mouseup', stopResize);
        setContent(quill.root.innerHTML);
      };

      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    };

    const setupImage = (img, imageData) => {
      if (img.src === imageData.src && !img.classList.contains('processed')) {
        img.className = 'image-preview processed';
        img.setAttribute('draggable', true);
        img.addEventListener('dragstart', handleImageDrag);
        img.addEventListener('dragend', handleImageDrop);
        const resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.addEventListener('mousedown', (e) => handleResize(e, img));
        img.parentNode.insertBefore(resizer, img.nextSibling);
      }
    };

    // Use MutationObserver to detect image additions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const imgs = quill.root.querySelectorAll('img');
          imgs.forEach((img) => {
            const matchingImage = images.find(i => i.src === img.src);
            if (matchingImage) setupImage(img, matchingImage);
          });
        }
      });
    });
    observer.observe(editorRef.current, { childList: true, subtree: true });

    const editor = editorRef.current;
    editor.addEventListener('dragover', (e) => e.preventDefault());
    editor.addEventListener('drop', (e) => {
      e.preventDefault();
      const img = e.dataTransfer.getData('text/html');
      if (img) {
        const range = quill.getSelection(true);
        quill.clipboard.dangerouslyPasteHTML(range.index, img);
      }
    });

    return () => {
      editor.removeEventListener('dragover', () => { });
      editor.removeEventListener('drop', () => { });
      observer.disconnect();
    };
  }, [previewMode, images]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      src: URL.createObjectURL(file),
      file: file,
    }));
    setImages((prev) => [...prev, ...newImages]);

    const quill = quillRef.current;
    const range = quill.getSelection(true) || { index: quill.getLength() };
    newImages.forEach((image) => {
      quill.insertEmbed(range.index, 'image', image.src);
      range.index++;
    });
    setContent(quill.root.innerHTML);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace blob URLs with Firebase Storage URLs in content
      let updatedContent = content;
      const uploadedImages = await Promise.all(
        images.map(async (img) => {
          const storageRef = ref(storage, `images/${img.file.name}-${img.id}`);
          await uploadBytes(storageRef, img.file);
          const url = await getDownloadURL(storageRef);
          // Replace blob URL with Firebase URL in content
          updatedContent = updatedContent.replace(img.src, url);
          return { name: img.file.name, src: url };
        })
      );

      // Update content state with Firebase URLs
      setContent(updatedContent);

      // Prepare post data
      const postData = {
        title,
        content: updatedContent,
        wordCount,
        images: uploadedImages,
        publishedAt: new Date().toISOString(),
      };

      // Save to Firestore
      await addDoc(collection(db, 'posts'), postData);

      alert('Article published successfully to Firebase!');
      // Reset form
      setTitle('');
      setContent('');
      setImages([]);
      setWordCount(0);
      if (quillRef.current) {
        quillRef.current.root.innerHTML = '';
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error publishing to Firebase:', error);
      alert('Failed to publish article: ' + error.message);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const goBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-law-DEFAULT rounded-lg">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-law-DEFAULT">Blog Editor</h1>
                <p className="text-sm text-gray-600">Create and publish articles for LSS Press</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {wordCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <FileText className="w-3 h-3" />
                  {wordCount} words
                </Badge>
                {images.length > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {images.length} image{images.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            )}

            <Button
              onClick={togglePreview}
              variant={previewMode ? "default" : "outline"}
              className="gap-2"
            >
              {previewMode ? (
                <>
                  <PenTool className="w-4 h-4" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {previewMode ? (
          /* Preview Mode */
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="border-b">
              <CardTitle className="text-3xl font-bold text-law-DEFAULT leading-tight">
                {title || 'Untitled Article'}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
                <span>{new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{Math.ceil(wordCount / 200)} min read</span>
              </div>
            </CardHeader>

            <CardContent className="pt-8">
              <div
                className="prose prose-lg prose-law max-w-none prose-headings:text-law-DEFAULT prose-a:text-law-DEFAULT prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{
                  __html: content || '<p class="text-gray-500 italic">Your content will appear here...</p>'
                }}
              />

              <div className="pt-8 mt-8 border-t">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-law-DEFAULT hover:bg-law-light text-white py-3 text-lg font-semibold"
                >
                  Publish Article
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Edit Mode */
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Title Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Article Title</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-semibold border-0 shadow-none px-0 focus-visible:ring-0"
                  placeholder="Enter your article title..."
                />
              </CardContent>
            </Card>

            {/* Editor Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="editor-wrapper border-0">
                  <div ref={editorRef} className="editor-container min-h-[500px]" />
                </div>
              </CardContent>
            </Card>

            {/* Image Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Add Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 text-gray-600"
                  >
                    <Upload className="w-6 h-6" />
                    <div className="text-center">
                      <p className="font-medium">Click to upload images</p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  💡 After uploading, you can drag images to reposition them and resize by dragging the corner handles
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;