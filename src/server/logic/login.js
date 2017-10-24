import { Random } from 'mockjs';

import pack from './pack';

module.exports = function (router) {
  router.post('/login', (req, res) => {
    setTimeout(() =>
      res.json(pack('17100006107|8eddd484737d23da9a5cc46ad8a32d42')),
      Random.natural(0, 2000),
    );
  });
};
