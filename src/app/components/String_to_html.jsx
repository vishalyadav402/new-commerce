import React from 'react';
import DOMPurify from 'dompurify';

const String_to_html = ({ htmlString, text_clip_paragraph}) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <>
    <div className={text_clip_paragraph} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </>
  );
};

export default String_to_html;
