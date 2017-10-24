import apDetail from './ap.detail';
import roundData from './outline.roundData';
import exchange from './exchange';
import outline from './outline';
import ap from './ap';

export default {
  path: 'monitor',
  component: resolve => import('./main').then(resolve),
  children: [outline, exchange, ap, apDetail, roundData],
};
