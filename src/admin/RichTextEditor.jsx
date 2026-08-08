import React, { useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Image as ImageIcon
} from 'lucide-react';

export function RichTextEditor({ value, onChange, placeholder = 'Write article content here...' }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL link:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const addImage = () => {
    const url = prompt('Enter Image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-900 shadow-inner flex flex-col">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-800 border-b border-slate-700 text-slate-300">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h2>')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h3>')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={addLink}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => execCommand('undo')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('redo')}
          className="p-1.5 hover:bg-slate-700 rounded transition text-slate-200 hover:text-white"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editable Container */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[220px] max-h-[450px] overflow-y-auto text-slate-100 focus:outline-none prose prose-invert max-w-none text-sm leading-relaxed"
        data-placeholder={placeholder}
      />
    </div>
  );
}
