"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";

// StarterKit already ships bold, italic and strike; underline is the only extra mark
const Tiptap = ({ onContentChange, value = "" }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value,
    // Avoids hydration mismatches when rendered from a Next.js page
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  // Keep the editor in sync when the parent resets or loads content (e.g. after submit)
  useEffect(() => {
    if (!editor) return;
    const isSame = value === editor.getHTML() || (value === "" && editor.isEmpty);
    if (!isSame) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  if (!editor) return null;

  const toolbarButton = (label, isActive, onClick, Icon) => (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isActive}
      onClick={onClick}
      className={`p-2 border rounded ${isActive ? "bg-gray-200" : ""}`}
    >
      <Icon />
    </button>
  );

  return (
    <div className="p-4 bg-white border rounded-lg">
      {/* Toolbar */}
      <div className="flex gap-2 mb-10">
        {toolbarButton("Bold", editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), FaBold)}
        {toolbarButton("Italic", editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), FaItalic)}
        {toolbarButton("Underline", editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), FaUnderline)}
        {toolbarButton("Strikethrough", editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), FaStrikethrough)}
      </div>

      {/* Text Editor */}
      <EditorContent
        editor={editor}
        className="bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Tiptap;
