"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  LinkIcon,
  Unlink,
  Trash2Icon,
} from "lucide-react";
import { useCallback, useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

interface DocumentEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  documentTitle?: string;
  isReadOnly?: boolean;
  onTitleChange?: (title: string) => void;
}

export default function DocumentEditorComponent({ 
  initialContent, 
  onSave, 
  documentTitle = "Untitled Document",
  isReadOnly = false,
  onTitleChange 
}: DocumentEditorProps) {
  const [title, setTitle] = useState(documentTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(documentTitle);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-400 underline cursor-pointer hover:text-blue-300",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent || `
      <h1>Welcome to Kongden Live Doc</h1>
      <p>Start creating your document here. This is a <strong>powerful</strong> and <em>intuitive</em> collaborative text editor.</p>
      <p>Features include:</p>
      <ul>
        <li><strong>Rich text formatting</strong> - Bold, italic, underline, and more</li>
        <li><em>Multiple heading levels</em> for better organization</li>
        <li><mark>Text highlighting</mark> and color options</li>
        <li>Lists, quotes, and <code>code snippets</code></li>
        <li>Real-time collaboration capabilities</li>
      </ul>
      <blockquote>
        <p>"The best way to get started is to quit talking and begin doing." - Walt Disney</p>
      </blockquote>
      <p>Happy writing! 🚀</p>
    `,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[500px] p-6 text-white prose-headings:text-white prose-p:text-white prose-strong:text-white prose-em:text-white prose-code:text-blue-300 prose-code:bg-blue-900/30 prose-code:px-1 prose-code:rounded prose-blockquote:border-l-blue-400 prose-blockquote:text-white/90 prose-ul:text-white prose-ol:text-white prose-li:text-white",
      },
    },
    editable: !isReadOnly,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
    },
  });

  // Auto-save functionality
  useEffect(() => {
    if (!editor || !onSave) return;

    const saveContent = debounce(() => {
      setIsSaving(true);
      const content = editor.getHTML();
      onSave(content);
      setLastSaved(new Date());
      setTimeout(() => setIsSaving(false), 500);
    }, 1000);

    const handleUpdate = () => saveContent();
    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      saveContent.cancel();
    };
  }, [editor, onSave]);

  // Update word count on mount
  useEffect(() => {
    if (editor) {
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
    }
  }, [editor]);

  // Update title when prop changes
  useEffect(() => {
    setTitle(documentTitle);
    setTempTitle(documentTitle);
  }, [documentTitle]);

  // Title editing functions
  const handleTitleClick = () => {
    if (!isReadOnly) {
      setIsEditingTitle(true);
      setTempTitle(title);
      // Focus the input after state update
      setTimeout(() => {
        titleInputRef.current?.focus();
        titleInputRef.current?.select();
      }, 0);
    }
  };

  const handleTitleSave = async () => {
    const newTitle = tempTitle.trim() || "Untitled Document";
    
    if (newTitle !== title) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setTitle(newTitle);
        if (onTitleChange) {
          onTitleChange(newTitle);
        }
        toast.success("Title updated successfully!");
      } catch (error) {
        toast.error("Failed to update title");
        setTempTitle(title); // Revert on error
      }
    }
    
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(title);
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTitleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleTitleCancel();
    }
  };

  const handleTitleBlur = () => {
    // Small delay to allow click events on save/cancel buttons
    setTimeout(() => {
      if (isEditingTitle) {
        handleTitleSave();
      }
    }, 150);
  };

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      {/* Document Header */}
      <div className="mb-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="relative group">
              {isEditingTitle ? (
                <div className="flex items-center space-x-2">
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onKeyDown={handleTitleKeyDown}
                    onBlur={handleTitleBlur}
                    className="text-2xl font-bold bg-white/5 text-white border border-white/20 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 placeholder:text-white/50 flex-1"
                    placeholder="Untitled Document"
                    maxLength={100}
                  />
                  <div className="flex items-center space-x-1">
                    <Button
                      onClick={handleTitleSave}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                    >
                      ✓
                    </Button>
                    <Button
                      onClick={handleTitleCancel}
                      size="sm"
                      variant="ghost"
                      className="text-white/60 hover:text-white hover:bg-white/10 px-3 py-1"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={handleTitleClick}
                  className={`text-2xl font-bold text-white cursor-pointer transition-all duration-200 px-3 py-2 rounded-lg ${
                    !isReadOnly 
                      ? "hover:bg-white/5 hover:text-blue-300 group-hover:bg-white/5" 
                      : ""
                  }`}
                  title={!isReadOnly ? "Click to edit title" : ""}
                >
                  {title}
                  {!isReadOnly && (
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/60 text-base">
                      ✏️
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 mt-2 text-sm text-white/60">
              <span className="flex items-center space-x-1">
                <span>{wordCount} words</span>
              </span>
              
              {lastSaved && (
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                </span>
              )}
              
              {isSaving && (
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              )}
              
              {isEditingTitle && (
                <span className="text-white/40 text-xs">
                  Press Enter to save, Esc to cancel
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="border border-white/20 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm shadow-xl">
        {/* Enhanced Toolbar */}
        <div className="border-b border-white/20 bg-white/5 p-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* History Controls */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="h-8 w-8 p-0 hover:bg-white/10 disabled:opacity-50"
                title="Undo"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="h-8 w-8 p-0 hover:bg-white/10 disabled:opacity-50"
                title="Redo"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-white/20" />

            {/* Text Formatting */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg">
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                className="h-8 w-8 p-0 data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-400"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                className="h-8 w-8 p-0 data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-400"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                className="h-8 w-8 p-0 data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-400"
                title="Underline"
              >
                <UnderlineIcon className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                className="h-8 w-8 p-0 data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-400"
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("code")}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
                className="h-8 w-8 p-0 data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-400"
                title="Code"
              >
                <Code className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("highlight")}
                onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
                className="h-8 w-8 p-0 data-[state=on]:bg-yellow-500/20 data-[state=on]:text-yellow-400"
                title="Highlight"
              >
                <Highlighter className="h-4 w-4" />
              </Toggle>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-white/20" />

            {/* Headings */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg">
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-purple-500/20 data-[state=on]:text-purple-400"
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-purple-500/20 data-[state=on]:text-purple-400"
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-purple-500/20 data-[state=on]:text-purple-400"
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </Toggle>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-white/20" />

            {/* Lists and Quotes */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg">
              <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-green-500/20 data-[state=on]:text-green-400"
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-green-500/20 data-[state=on]:text-green-400"
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBlockquote().run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-gray-500/20 data-[state=on]:text-gray-400"
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </Toggle>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-white/20" />

            {/* Text Alignment */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg">
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-orange-500/20 data-[state=on]:text-orange-400"
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-orange-500/20 data-[state=on]:text-orange-400"
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-orange-500/20 data-[state=on]:text-orange-400"
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "justify" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className="h-8 w-8 p-0 data-[state=on]:bg-orange-500/20 data-[state=on]:text-orange-400"
                title="Justify"
              >
                <AlignJustify className="h-4 w-4" />
              </Toggle>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-white/20" />

            {/* Links */}
            <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={setLink}
                className={`h-8 w-8 p-0 hover:bg-white/10 ${
                  editor.isActive("link") ? "bg-blue-500/20 text-blue-400" : ""
                }`}
                title="Add Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive("link")}
                className="h-8 w-8 p-0 hover:bg-white/10 disabled:opacity-50"
                title="Remove Link"
              >
                <Unlink className="h-4 w-4" />
              </Button>
            </div>

            {/* Danger Zone */}
            <div className="ml-auto">
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to clear all content?")) {
                    editor.chain().focus().clearContent().run();
                  }
                }}
                className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                title="Clear Document"
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="bg-white/5 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
