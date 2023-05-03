import React from 'react';
import styles from './index.module.less';
import { FooterInfos } from '../const';
import { safetyHref } from '../../../utils/safetyHref';

function Footer() {
  return (
    <div className={styles.footer}>
      {
        FooterInfos.map((item) => (
          <div className={styles['footer-links']} key={item.title}>
            <p className={styles.title}>{ item.title }</p>
            {
              item.contents.map((link) => (
                <p
                  className={styles['link-item']}
                  key={link.label}
                  onClick={() => safetyHref(link.href)}
                >
                  <span className={styles.icon}>{ link.icon }</span>
                  <span className={styles.label}>{ link.label }</span>
                </p>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default React.memo(Footer);
