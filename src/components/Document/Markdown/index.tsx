import React, { useEffect } from 'react';
import styles from './index.module.less';
import ReactMarkdown from 'react-markdown';

import remarkgfm from 'remark-gfm';
import { RemarkComponents } from './RemarkComponents';
import { getCatalogByMarkdown } from './utils';

export interface MarkdownProps {
  markdown: string;
}

function Markdown({ markdown }: MarkdownProps) {
  useEffect(() => {
    console.log(getCatalogByMarkdown(markdown));
  }, [markdown]);

  return (
    <div className={styles['markdown-wrapper']}>
      <ReactMarkdown
        remarkPlugins={[remarkgfm]}
        components={RemarkComponents}
      >
        { markdown }
      </ReactMarkdown>
    </div>
  );
}

export default React.memo(Markdown);
