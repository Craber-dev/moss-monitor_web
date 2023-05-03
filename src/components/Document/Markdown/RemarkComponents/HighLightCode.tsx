import React from 'react';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Typography } from 'antd';

const { Text } = Typography;

// @ts-ignore-next-line
function HighLightCode({ inline, className, children, ...props }: CodeProps) {
  const match = /language-(\w+)/.exec(className || '');
  return !inline ? (
    <SyntaxHighlighter
      {...props}
      style={{
        ...tomorrow,
        'pre[class*="language-"]': {
          ...tomorrow['pre[class*="language-"]'],
          borderRadius: 10
        },
      }}
      language={match ? match[1] : 'unknown'}
      PreTag="div"
      showLineNumbers
    >
      { String(children).replace(/\n$/, '') }
    </SyntaxHighlighter>
  ) : (
    <Text code style={{ fontSize: 17, color: '#e0e0e0' }}>{ String(children).replace(/\n$/, '') }</Text>
  );
}

export default React.memo(HighLightCode);
