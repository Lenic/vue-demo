import Mock, { Random } from 'mockjs';
import _ from 'underscore';
import moment from 'moment';

import pack from './pack';

const stations = _.map(_.range(1, 10), v => ({
  stationId: v.toString(),
  stationName: `杭州第 ${v} 人民医院`,
}));

module.exports = function (router) {
  router.get('/user/station', (req, res) =>
    setTimeout(() => res.json(pack(stations)), Random.natural(0, 2000)));

  router.get('/user/data', (req, res) => {
    let begin = moment(req.query.sDay, 'YYYYMMDD');
    const end = moment(req.query.eDay, 'YYYYMMDD')
      , date = moment(req.query.date, 'YYYYMMDD')
      , stationId = req.query.stationId;

    let days = 1;
    if (begin.isValid() && end.isValid()) {
      days = moment.duration(end.valueOf() - begin.valueOf()).asDays();
    } else {
      begin = date;
    }

    const list = _.map(_.range(days), v => ({
      dayActiveCount: Random.integer(1, 100),
      wifiConnectCount: Random.integer(1, 100),

      dayAddCount: Random.integer(1, 100),
      wifiConnectActiveCount: Random.integer(1, 100),

      ds: moment(begin).add(v, 'day').format('YYYYMMDD'),
      id: Random.increment(1),

      last7DayActiveCount: Random.integer(100, 1000),
      last7DayWifiConnectActiveCount: Random.integer(100, 1000),

      last7DayAddCount: Random.integer(100, 1000),
      last7DayWifiConnectCount: Random.integer(100, 1000),

      stationId,
      userAllCount: Random.integer(1000, 10000),
      wifiConnectAllCount: Random.integer(1000, 10000),
    }));

    setTimeout(() => res.json(pack(list)), Random.natural(0, 2000));
  });
  router.get('/user/export', (req, res) => {
    setTimeout(() => res.json({ result: "http://helian.file.alimmdn.com/2017/10/19/1508390244766_2017-10-19.xls" }), Random.natural(0, 2000));
  });
}
