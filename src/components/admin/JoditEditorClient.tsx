'use client';

import { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

type Props = {
  initialValue?: string;
  onChangeHTML?: (html: string) => void;
  theme?: 'light' | 'dark';
};

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function JoditEditorClient({
  initialValue = '',
  onChangeHTML,
  theme = 'light',
}: Props) {
  // ✅ Load Jodit CSS on client only (avoids Next CSS parser error)
  useEffect(() => {
    const id = 'jodit-css';
    if (document.getElementById(id)) return;

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    // You must copy the file to /public (see note below)
    link.href = '/jodit.min.css';
    document.head.appendChild(link);
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      spellcheck: true,
      toolbarAdaptive: false,
      height: 380,
      placeholder: 'Start writing…',
      theme, // 'dark' | 'light'
      uploader: { insertImageAsBase64URI: true },
    }),
    [theme]
  );

  return (
    <div className="rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* @ts-ignore */}
      <JoditEditor
        value={initialValue}
        config={config}
        onBlur={(newContent: string) => onChangeHTML?.(newContent)}
        onChange={() => {}}
      />
    </div>
  );
}
