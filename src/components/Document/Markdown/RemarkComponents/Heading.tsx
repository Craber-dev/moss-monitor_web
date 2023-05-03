import React from 'react';
import { Typography } from 'antd';
import { TitleProps } from 'antd/es/typography/Title';
import { ReactNode } from 'react';

const { Title } = Typography;

export interface HeadingProps {
  level: number;
  children: ReactNode & ReactNode[];
}

function Heading({ level, children }: HeadingProps) {
  if (level > 0 && level < 6) {
    return <Title level={level as TitleProps['level']} style={{ color: '#e0e0e0' }}>{ children }</Title>;
  } else {
    return <p>{ children }</p>;
  }
}

export default React.memo(Heading);
