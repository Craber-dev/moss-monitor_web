import { GithubOutlined, AntDesignOutlined } from '@ant-design/icons';
import ReactLogo from '@/assets/image/react.svg';

export const TopGuides = [
  { label: '快速开始', key: '/quick_start' },
  { label: '使用文档', key: '/document' },
  { label: '监控看板', key: '/monitor' },
  { label: 'ONCALL', key: '/oncall' },
  { label: '关于我们', key: '/about_us' }
];

export const FooterInfos = [
  {
    title: '友情链接',
    contents: [
      { label: 'GitHub', icon: <GithubOutlined />, href: 'https://www.github.com' },
      { label: 'React', icon: <img src={ReactLogo} />, href: 'https://react.docschina.org/' },
      { label: 'Ant Design Web', icon: <AntDesignOutlined />, href: 'https://ant.design/index-cn' },
    ],
  },
  {
    title: '联系我们',
    contents: [
      { label: 'Github Issues', icon: <GithubOutlined />, href: 'https://github.com/Craber-dev/moss-monitor_web/issues' },
    ]
  }
];
