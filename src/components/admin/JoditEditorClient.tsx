'use client'

import { useRef } from 'react'
import JoditEditor from 'jodit-react'

interface Props {
  initialValue?: string
  onChangeHTML: (html: string) => void // parent me ref update ke liye
}

export default function JoditEditorClient({ initialValue = '', onChangeHTML }: Props) {
  const editorRef = useRef<any>(null)
  const initialRef = useRef<string>(initialValue) // sirf first mount pe use hoga

  return (
    <JoditEditor
      ref={editorRef}
      // NOTE: value ko state se mat baandho. Initial ke liye stable ref pass karo:
      value={initialRef.current}
      // onChange ko use kar sakte ho, par parent state ko mat set karo (re-render cause)
      onChange={() => { /* no-op: re-render avoid */ }}
      onBlur={(newContent) => onChangeHTML(newContent)} // blur pe pakka update
      config={{
        readonly: false,
        height: 420,
        placeholder: 'Write your blog content here...',
        toolbarAdaptive: false,
        buttons: [
          'bold','italic','underline','strikethrough','|',
          'ul','ol','|',
          'link','image','table','|',
          'undo','redo','eraser','source'
        ],
        // Live update without re-render (direct from instance)
        events: {
          // Jodit ka 'change' event har edit par fire hota hai
          change: (newContent: string, editor: any) => {
            try {
              onChangeHTML(editor?.value ?? newContent)
            } catch {
              // ignore
            }
          },
        },
      }}
    />
  )
}
