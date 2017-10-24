import Mock, { Random } from 'mockjs';
import _ from 'underscore';
import moment from 'moment';

import pack from './pack';
import { mac, some } from './common';

module.exports = function (router) {
  router.get('/charge/list', (req, res) => {
    const minCount = req.query.page * req.query.limit
      , total = Random.integer(minCount, 500)
      , count = (total - minCount) % req.query.limit && req.query.limit;

    const result = _.map(_.range(0, count), (v, i) => Mock.mock({
      "id": i,
      "msisdn": Random.integer(100000000000, 999999999999).toString(),
      "status": 1,
      "billProject|1": [
        '信息服务费',
        '网费',
      ],
      "billFee": `${Random.integer(0, 100)}元`,
      "statusStr|1": [
        '已入账',
        '已退款',
      ],
      "orderDateStr": Random.date('yyyy-MM-dd'),
    }));

    setTimeout(() => res.json(pack(result, total)), Random.natural(0, 2000));
  });
  router.post('/charge/refund', (req, res) => {
    setTimeout(() => res.json({ result: 0 }), Random.natural(0, 2000));
  });
  router.get('/charge/export', (req, res) => {
    const url = 'http://helian.file.alimmdn.com/2017/10/11/1507712301916_2017-10-11.xls';

    setTimeout(() => res.json({ result: url }), Random.natural(0, 2000));
  });
};
