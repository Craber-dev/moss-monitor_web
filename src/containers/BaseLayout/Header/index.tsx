import React, { useEffect, useState } from 'react';
import styles from './index.module.less';

import mossLogo from '@/assets/image/moss-logo.png';
import { TopGuides } from '../const';
import { useLocation, useNavigate } from 'react-router';

function GlobalHeader() {
  const location = useLocation();
  const [activeGuideKey, setActiveGuideKey] = useState<string>();
  const navigator = useNavigate();

  useEffect(() => {
    setActiveGuideKey('/' + location.pathname.split('/').slice(1).shift());
  }, [location]);

  return (
    <div className={styles['global-header']}>
      <img src={mossLogo} className={styles['moss-logo']} onClick={() => navigator('/')} />
      <div className={styles['top-guide']}>
        {
          TopGuides.map((item) => (
            <span
              key={item.key}
              className={activeGuideKey === item.key ? styles.active : ''}
              onClick={() => {
                setActiveGuideKey(item.key);
                navigator(item.key);
              }}
            >
              {item.label}
            </span>
          ))
        }
      </div>
      <div className={styles['user-tab']}>
        <div className={styles.unauth}>
          <span>登录</span>
          <span>注册</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(GlobalHeader);
