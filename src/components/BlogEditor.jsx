
import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { PenTool, Eye, Upload, FileText, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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

    // Custom image handling
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
      editor.removeEventListener('dragover', () => {});
      editor.removeEventListener('drop', () => {});
    };
  }, [previewMode]);

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
      
      setTimeout(() => {
        quill.root.querySelectorAll('img').forEach((img) => {
          if (img.src === image.src && !img.classList.contains('processed')) {
            img.className = 'image-preview processed';
            img.setAttribute('draggable', true);
            img.addEventListener('dragstart', handleImageDrag);
            img.addEventListener('dragend', handleImageDrop);
            
            const resizer = document.createElement('div');
            resizer.className = 'resizer';
            resizer.addEventListener('mousedown', (e) => handleResize(e, img));
            img.parentNode.insertBefore(resizer, img.nextSibling);
          }
        });
      }, 100);
      
      range.index++;
    });
    setContent(quill.root.innerHTML);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      wordCount,
      images: images.map((img) => ({
        name: img.file.name,
        src: img.src,
      })),
      publishedAt: new Date().toISOString(),
    };
    console.log('Post Data:', postData);
    alert('Article published successfully! Check console for details.');
    
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
      
      <style jsx>{`
        .ql-container {
          border: none !important;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background: #f9fafb;
          padding: 16px;
        }
        
        .ql-toolbar .ql-stroke {
          stroke: #1e40af;
        }
        
        .ql-toolbar .ql-fill {
          fill: #1e40af;
        }
        
        .ql-toolbar button:hover {
          background: #e0e7ff;
          border-radius: 6px;
        }
        
        .ql-editor {
          padding: 24px;
          color: #1f2937;
          min-height: 500px;
        }
        
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: italic;
        }
        
        .image-preview {
          max-width: 100%;
          margin: 20px 0;
          border-radius: 8px;
          cursor: move;
          position: relative;
          display: inline-block;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .image-preview:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #1e40af;
        }
        
        .resizer {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #1e40af;
          border: 2px solid white;
          border-radius: 50%;
          cursor: se-resize;
          bottom: -6px;
          right: -6px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
        }
        
        .resizer:hover {
          background: #1d4ed8;
          transform: scale(1.2);
        }
        
        .prose-law h1, .prose-law h2, .prose-law h3, .prose-law h4, .prose-law h5, .prose-law h6 {
          color: #1e40af;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;
