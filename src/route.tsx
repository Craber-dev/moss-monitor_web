import { FC, lazy } from 'react';
import BaseLayout from './containers/BaseLayout';

export enum HeaderType {
  global = 'global',
  subPage = 'subPage'
}

export interface RouteItem {
  path: string;
  redirect?: string;
  component?: FC;
  children?: RouteItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout?: any;
}

export const ROUTE_CONFIG: RouteItem[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Guide')),
    layout: BaseLayout,
  },
  {
    path: '/quick_start',
    component: lazy(() => import('./pages/QuickStart')),
    layout: BaseLayout,
  }
];
