import { lazy } from 'react';

import { PUBLIC_PAGES } from '../constants/enum';

const Home = lazy(() => import('./home/Home'));

export const Pages = {
  Home,
};

const RoutesString = {
  Home: PUBLIC_PAGES.NAME.HOME,
};

export default RoutesString;
