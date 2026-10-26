'use client';

import React, { useState } from 'react';

type Language = 'english' | 'kinyarwanda' | 'french';

const languages: { key: Language; label: string }[] = [
  { key: 'kinyarwanda', label: 'Kinyarwanda' },
  { key: 'french', label: 'French' },
  { key: 'english', label: 'English' },
];

// `contents` is sanitized on the server before it reaches this component
function StoryContent({ contents }: { contents: Record<Language, string> }) {
  const [language, setLanguage] = useState<Language>('english');

  return (
    <div className='bg-white px-5 py-5 md:px-20 md:py-10 text-slate-800'>
      <div
        className='contents prose prose-slate max-w-none text-slate-700'
        dangerouslySetInnerHTML={{
          __html: contents[language],
        }}
      />

      <div className='border-t border-slate-200 mt-10 pt-5 flex items-center justify-between flex-col md:flex-row'>
        <div>
          <span className='text-slate-600 text-sm'>Change Language: </span>
          <span className='text-slate-600 text-sm font-semibold'>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
        </div>
        <div className="flex space-x-4 mt-5 md:mt-0">
          {languages.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setLanguage(key)}
              className={`px-4 py-2 rounded ${language === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryContent;
