import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

interface MarkdownMessageProps {
  content: string;
}

const markedOptions = {
  gfm: true,
  breaks: true,
};

/**
 * 將後端回傳的 Markdown(Markdown) 轉換為安全的 HTML 片段。
 */
export function MarkdownMessage({ content }: MarkdownMessageProps) {
  const sanitizedHtml = useMemo(() => {
    const rawHtml = marked.parse(content, { ...markedOptions, async: false });
    const serialized = typeof rawHtml === 'string' ? rawHtml : '';
    return DOMPurify.sanitize(serialized);
  }, [content]);

  return (
    <div
      className="message-body"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
