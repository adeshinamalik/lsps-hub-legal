import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline'],
          [{ align: [] }, { direction: 'rtl' }],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
      placeholder: 'Compose your content here...',
    });

    quill.on('text-change', () => {
      setContent(quill.root.innerHTML);
    });

    quillRef.current = quill;

    const handleImageDrag = (e) => {
      e.target.style.opacity = '0.6';
    };
    const handleImageDrop = (e) => {
      e.target.style.opacity = '1';
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
        img.style.width = `${Math.max(50, newWidth)}px`;
        img.style.height = `${Math.max(50, newHeight)}px`;
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
  }, []);

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
      quill.root.querySelectorAll('img').forEach((img) => {
        if (img.src === image.src) {
          img.className = 'image-preview';
          img.setAttribute('draggable', true);
          img.addEventListener('dragstart', handleImageDrag);
          img.addEventListener('dragend', handleImageDrop);
          const resizer = document.createElement('div');
          resizer.className = 'resizer';
          resizer.addEventListener('mousedown', (e) => handleResize(e, img));
          img.parentNode.insertBefore(resizer, img.nextSibling);
        }
      });
      range.index++;
    });
    setContent(quill.root.innerHTML);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      images: images.map((img) => ({
        name: img.file.name,
        src: img.src,
      })),
    };
    console.log('Post Data:', postData);
    alert('Post submitted! Check console for data.');
    setTitle('');
    setContent('');
    setImages([]);
    quillRef.current.root.innerHTML = '';
    fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-serif font-semibold text-slate-800 mb-8 text-center">
          Craft Your Blog Post
        </h1>
        <div className="space-y-8">
          <div>
            <label className="block text-slate-700 font-serif text-lg font-medium mb-3">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-slate-300 rounded-lg bg-white text-slate-800 text-base font-serif focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
              placeholder="Enter your post title"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-serif text-lg font-medium mb-3">
              Content
            </label>
            <div ref={editorRef} className="editor-container" />
          </div>
          <div>
            <label className="block text-slate-700 font-serif text-lg font-medium mb-3">
              Upload Images
            </label>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-4 border border-slate-300 rounded-lg bg-white text-slate-800 text-base font-serif focus:outline-none focus:border-teal-600 transition-all duration-300"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-700 text-white py-4 rounded-lg hover:bg-teal-800 hover:shadow-xl transition-all duration-300 font-serif text-lg font-medium"
          >
            Publish Post
          </button>
        </div>
      </div>
      <style jsx>{`
        .ql-container {
          min-height: 280px;
          border-radius: 0 0 8px 8px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          font-family: 'Georgia', serif;
          color: #334155;
        }
        .ql-toolbar.ql-snow {
          border-radius: 8px 8px 0 0;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .image-preview {
          max-width: 100%;
          margin: 16px 0;
          border-radius: 8px;
          cursor: move;
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }
        .image-preview:hover {
          transform: scale(1.01);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }
        .resizer {
          position: absolute;
          width: 14px;
          height: 14px;
          background: #0f766e;
          border: 2px solid #fff;
          border-radius: 50%;
          cursor: se-resize;
          bottom: -4px;
          right: -4px;
          transition: background 0.3s ease;
        }
        .resizer:hover {
          background: #115e59;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;