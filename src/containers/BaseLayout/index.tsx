import React from 'react';
import styles from './index.module.less';
import GlobalHeader from './Header';
import Footer from './Footer';

export interface BaseLayoutProps {
  children?: React.ReactElement;
}

function BaseLayout(props: BaseLayoutProps) {
  const { children } = props;
  return (
    <div className={styles['base-layout']}>
      <GlobalHeader />
      { children }
      <Footer />
    </div>
  );
}

export default React.memo(BaseLayout);
