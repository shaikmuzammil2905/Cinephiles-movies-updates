import React from 'react';

/**
 * Utility to safely format & render rich text / HTML / plain content in React components.
 * If text contains HTML tags (e.g. <span, <div, <p, <a, <strong, etc.), it uses dangerouslySetInnerHTML.
 * If text is plain text with newlines (\n\n or \n), it converts newlines into formatted paragraphs.
 */
export function renderFormattedContent(content, fallbackText = '') {
  const textToRender = content || fallbackText || '';
  if (!textToRender) return null;

  // Check if string contains HTML elements
  const containsHtml = /<[a-z][\s\S]*>/i.test(textToRender);

  if (containsHtml) {
    return (
      <div
        className="prose prose-slate max-w-none text-slate-800 leading-relaxed overflow-x-auto break-words"
        dangerouslySetInnerHTML={{ __html: textToRender }}
      />
    );
  }

  // Otherwise, split plain text into paragraphs
  const paragraphs = textToRender.split(/\n\n+/).filter(Boolean);
  return (
    <div className="space-y-4 text-slate-800 leading-relaxed">
      {paragraphs.map((para, idx) => (
        <p key={idx} className="whitespace-pre-line">
          {para}
        </p>
      ))}
    </div>
  );
}
