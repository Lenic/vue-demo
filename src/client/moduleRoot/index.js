import manage from './manage';
import monitor from './monitor';

export default {
  path: '/',
  component: resolve => import('./main').then(resolve),
  children: [monitor, manage],
};
