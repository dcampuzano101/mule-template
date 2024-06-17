'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from '@/components/ToolBar';
import Heading from '@tiptap/extension-heading';
import HardBreak from '@tiptap/extension-hard-break';

export default function Tiptap({
  menu,
  onChange,
}: {
  menu: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'min-h-[1rem]',
          },
        },
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.chain().createParagraphNear().run(),
          };
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: 'text-2xl',
          levels: [1, 2],
        },
      }),
    ],
    content: menu,
    editorProps: {
      attributes: {
        class:
          'w-full overflow-auto rounded-md border min-h-[150px] max-h-[500px] border-input p-1',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className='flex flex-col w-full'>
      <div className='py-5'>
        <Toolbar editor={editor} />
      </div>
      <div className='py-5'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
