'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'jodit/es5/jodit.min.css';

type Props = {
  initialValue?: string;
  onChangeHTML?: (html: string) => void;
  theme?: 'light' | 'dark';
};

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export default function JoditEditorClient({ initialValue = '', onChangeHTML, theme = 'light' }: Props) {
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
