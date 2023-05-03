import React, { useState } from 'react';
import styles from './index.module.less';
import { CatalogInfo } from './types';

export interface CatalogProps {
  catalogs: CatalogInfo[];
}

function Section({ label, source, parent, activeKey, onClick }: {
  parent?: string;
  activeKey: string;
  onClick: React.Dispatch<React.SetStateAction<string>>;
} & CatalogInfo) {
  const activeLabel = parent ? parent + '.' + label : label;
  return (
    <p
      className={`${styles['section-label']} ${activeKey === activeLabel ? styles.active : ''}`}
      onClick={() => onClick(activeLabel)}
    >
      { label }
    </p>
  );
}

function Catalog({ catalogs }: CatalogProps) {
  const [activeKey, setActiveKey] = useState('');
  return (
    <div className={styles['catalog-wrapper']}>
      {
        catalogs.map((catalog) => catalog.sections ? (
          <div className={styles.catalog} key={catalog.label}>
            <p className={styles['catalog-label']}>{ catalog.label }</p>
            {
              catalog.sections.map((item) => (
                <Section
                  parent={catalog.label}
                  activeKey={activeKey}
                  onClick={setActiveKey}
                  {...item}
                  key={item.label}
                />
              ))
            }
          </div>
        ) : (
          <Section
            activeKey={activeKey}
            onClick={setActiveKey}
            {...catalog}
            key={catalog.label}
          />
        ))
      }
    </div>
  );
}

export default React.memo(Catalog);
