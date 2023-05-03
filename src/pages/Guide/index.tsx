import React from 'react';
import styles from './index.module.less';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

function Guide() {
  const navigator = useNavigate();
  return (
    <div className={styles['guide-page']}>
      <p className={styles.title1}><span style={{ color: '#FF6600' }}>MOSS</span> MONITOR</p>
      <p className={styles.title2}>前端性能监控</p>
      <p className={styles['sub-title']}>一站式前端监控、错误告警、性能分析、用户反馈及客户服务解决方案</p>
      <p>
        <button className={styles['primary-btn']} onClick={() => navigator('/quick_start')}>快速开始</button>
        <span className={styles['text-btn']}>使用文档 <ArrowRightOutlined style={{ marginLeft: 5 }} /></span>
      </p>
    </div>
  );
}

export default React.memo(Guide);
