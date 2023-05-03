import HighLightCode from './HighLightCode';
import { Typography } from 'antd';
import { ReactNode } from 'react';
import Heading from './Heading';
import { safetyHref } from '../../../../utils/safetyHref';

import styles from '../index.module.less';

const { Paragraph } = Typography;

export const RemarkComponents = {
  code: HighLightCode,
  h1: Heading, h2: Heading, h3: Heading, h4: Heading, h5: Heading,
  p: ({ children }: { children: ReactNode & ReactNode[] }) => (<Paragraph style={{ fontSize: 17, fontWeight: 500, color: '#e0e0e0' }}>{ children }</Paragraph>),
  ul: ({ children }: { children: ReactNode & ReactNode[] }) => (<Paragraph style={{ fontSize: 17, fontWeight: 500, color: '#e0e0e0' }}><ul>{ children }</ul></Paragraph>),
  ol: ({ children }: { children: ReactNode & ReactNode[] }) => (<Paragraph style={{ fontSize: 17, fontWeight: 500, color: '#e0e0e0' }}><ol>{ children }</ol></Paragraph>),
  a: ({ href, children }: { href?: string, children: ReactNode & ReactNode[] }) => (
    <span className={styles['text-link']} onClick={() => (href && safetyHref(href))}>{ children }</span>
  ),
  table: ({ children }: { children: ReactNode & ReactNode[] }) => (<div className={styles['table-wrapper']}><table>{ children }</table></div>),
};
