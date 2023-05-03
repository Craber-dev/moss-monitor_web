import React from 'react';
import styles from './index.module.less';
import Catalog from './Catalog';
import { catalogAnimateTest, catalogs, mockMarkdownText } from './mock';
import Markdown from './Markdown';

export interface DocumentProps {
  theme?: 'light' | 'dark';
}

function Document(props: DocumentProps) {
  return (
    <div className={styles['document-wrapper']}>
      <div className={styles.catalog}>
        <Catalog catalogs={catalogs} />
      </div>
      <div className={styles.content}>
        <Markdown markdown={mockMarkdownText} />
      </div>
    </div>
  );
}

export default React.memo(Document);
