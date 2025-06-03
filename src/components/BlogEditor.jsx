
import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { PenTool, Eye, Upload, Sparkles, FileText, Image as ImageIcon } from 'lucide-react';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

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
      placeholder: 'Start writing your masterpiece...',
    });

    quill.on('text-change', () => {
      const html = quill.root.innerHTML;
      setContent(html);
      setWordCount(quill.getText().trim().split(/\s+/).length);
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
    alert('✨ Your masterpiece has been published! Check console for details.');
    
    // Reset form with animation
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Beautiful Editor
            </h1>
            <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 font-medium">Craft your thoughts into beautiful stories</p>
        </div>

        {/* Main Editor Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">
                    {wordCount > 0 ? `${wordCount} words` : 'Start writing...'}
                  </span>
                </div>
                {images.length > 0 && (
                  <div className="flex items-center gap-2 text-white/90">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm">{images.length} image{images.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={togglePreview}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm"
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
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {previewMode ? (
              /* Preview Mode */
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-200 pb-6">
                  <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                    {title || 'Untitled Masterpiece'}
                  </h1>
                  <div className="flex items-center gap-4 mt-4 text-gray-500">
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{Math.ceil(wordCount / 200)} min read</span>
                  </div>
                </div>
                
                <div 
                  className="prose prose-lg prose-indigo max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ 
                    __html: content || '<p class="text-gray-500 italic">Your beautiful content will appear here...</p>' 
                  }}
                />
                
                <div className="pt-8 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 font-bold text-lg"
                  >
                    ✨ Publish Your Masterpiece
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <div className="space-y-8 animate-fade-in">
                {/* Title Input */}
                <div className="space-y-3">
                  <label className="block text-gray-700 font-semibold text-lg">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 text-2xl font-bold border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-gray-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your captivating title..."
                  />
                </div>
                
                {/* Rich Text Editor */}
                <div className="space-y-3">
                  <label className="block text-gray-700 font-semibold text-lg">
                    Content
                  </label>
                  <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-inner">
                    <div ref={editorRef} className="editor-container min-h-[400px]" />
                  </div>
                </div>
                
                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="block text-gray-700 font-semibold text-lg">
                    Add Images
                  </label>
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
                      className="w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 flex items-center justify-center gap-3 text-gray-600 hover:text-indigo-600"
                    >
                      <Upload className="w-6 h-6" />
                      <span className="font-medium">Click to upload images or drag them into the editor</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    💡 Pro tip: After uploading, drag images to reposition and resize by pulling the corner handle
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
          
          .ql-container {
            min-height: 400px;
            border: none !important;
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            line-height: 1.6;
          }
          
          .ql-toolbar.ql-snow {
            border: none !important;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 16px;
            border-radius: 16px 16px 0 0;
          }
          
          .ql-toolbar .ql-stroke {
            stroke: #6366f1;
          }
          
          .ql-toolbar .ql-fill {
            fill: #6366f1;
          }
          
          .ql-toolbar button:hover {
            background: #e0e7ff;
            border-radius: 8px;
          }
          
          .ql-editor {
            padding: 24px;
            color: #1f2937;
          }
          
          .ql-editor.ql-blank::before {
            color: #9ca3af;
            font-style: italic;
          }
          
          .image-preview {
            max-width: 100%;
            margin: 20px 0;
            border-radius: 16px;
            cursor: move;
            position: relative;
            display: inline-block;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 2px solid transparent;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          
          .image-preview:hover {
            transform: translateY(-2px) scale(1.01);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-color: #818cf8;
          }
          
          .resizer {
            position: absolute;
            width: 18px;
            height: 18px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border: 3px solid white;
            border-radius: 50%;
            cursor: se-resize;
            bottom: -6px;
            right: -6px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
          }
          
          .resizer:hover {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            transform: scale(1.2);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
          }
          
          .prose img {
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          
          .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            background: linear-gradient(135deg, #1f2937 0%, #4f46e5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BlogEditor;
