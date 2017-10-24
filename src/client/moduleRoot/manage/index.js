import alarm from './alarm';
import notice from './notice';
import addressBook from './addressBook';

export default {
  path: 'manage',
  component: resolve => import('./main').then(resolve),
  children: [addressBook, alarm, notice],
};
