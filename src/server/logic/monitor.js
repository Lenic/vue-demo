import Mock, { Random } from 'mockjs';
import _ from 'underscore';
import moment from 'moment';

import pack from './pack';
import { mac, some } from './common';

module.exports = function (router) {
  router.get('/monitor/sn', (req, res) => {
    const list = _.map(_.range(Random.natural(1, 10)), v => ({
      id: v,
      apSn: Random.natural(100000000000, 999999999999).toString(),
      apClients: Random.integer(0, 1000),
      downsideAvgvalue: Random.natural(0, 100).toString(),
      bandwidth: Random.natural(0, 100).toString(),
    }));
    setTimeout(() => res.json(pack(list)), Random.natural(0, 2000));
  });

  router.get('/monitor/ac', (req, res) => {
    const minCount = req.query.page * req.query.limit
      , total = Random.integer(minCount, 500)
      , count = (total - minCount) % req.query.limit && req.query.limit;

    const result = _.map(_.range(0, count), (v, i) => Mock.mock({
      id: i,
      "exchangeMac": mac(),
      "apSn": Random.integer(100000000000, 999999999999).toString(),
      "stationId": req.query.stationId,
      "exchangeIp": Random.ip(),
      "exchangeAddress": Random.csentence(5, 13),
      "remark": "贴有禾连标签",
      "gmtCreater": Random.first(),
      "gmtCreatetime": Random.date('yyyy-MM-dd HH:mm:ss'),
      "gmtModified": Random.first(),
      "gmtModifytime": Random.date('yyyy-MM-dd HH:mm:ss'),
      "exchangeDeviceFactory|1": [
        'TP-LINK',
        'IP-COM',
        'CISCO',
        'HUAWEI',
        'D-Link',
        'H3C',
        'Linksys',
        'Netcore',
        'Kingnet',
        'MERCURY',
      ],
      "exchangeDeviceModel|1": [
        'TL-SL2218P',
        'G3224P',
        'MA5200G-2',
        'MA5200G-4',
        'AR101-S',
        'AR111-S',
        'NE16EX-6',
        'SRG2320',
      ],
      "addressImgUrl": null,
      "troubleshootingUrl": null,
    }));

    setTimeout(() => res.json(pack(result, total)), Random.natural(0, 2000));
  });

  router.get('/monitor/apStat', (req, res) => {
    const list = [
      {
        "key": "onlines",
        "value": Random.integer(0, 300),
      },
      {
        "key": "unknowns",
        "value": Random.integer(0, 10),
      },
      {
        "key": "offlines",
        "value": Random.integer(0, 30),
      }
    ];

    setTimeout(() => res.json(pack(list)), Random.natural(0, 2000));
  });

  const wifiSsids = [
    '建德医院WIFI',
    'JDRMYY-WIFI',
    'CMCC',
    'ChinaNet',
    'ChinaUnicom',
  ];
  router.get('/monitor/ap', (req, res) => {
    const minCount = req.query.page * req.query.limit
      , total = Random.integer(minCount, 500)
      , count = (total - minCount) % req.query.limit && req.query.limit;

    const result = _.map(_.range(0, count), (v, i) => Mock.mock({
      id: i,
      fapMac: mac(),
      fapSn: `T${Random.natural(100000000000, 999999999999)}`,
      'fapDeviceFactory|1': [
        '寰创',
        '锐捷',
        '敦崇',
      ],
      'fapDeviceModel|1': [
        '双频',
        '室内双频2*2',
        '单频',
        '室内单频2*2',
      ],
      apSn: Random.integer(1000000000000, 9999999999999).toString(),
      exchangeSn: `T${Random.integer(1000000000000000, 9007199254740992)}`,
      exchangeDeviceFactory: null,
      exchangeDeviceModel: null,
      'building|1': [
        '门诊',
        '住院',
      ],
      'buildingFloor|1': [
        '1F',
        '2F',
        '3F',
        '4F',
      ],
      imgName: `AP${Random.integer(1, 99)}-${Random.integer(1, 18)}F`,
      'fapAddress|1': [
        '肿瘤29',
        '中医科等候区',
        '输液大厅1',
        '等候区',
        '门诊药房',
        '预检等候区',
        '输液大厅2',
        '体检接待候诊区',
        '收费处',
        '导医台',
        '挂号收费',
        '8109病房 8110病房',
        '院长室',
        '11112病房 11103病房 11206病房',
        '外科门诊',
        '外科检查',
        '手术室等候区',
      ],
      radioFrequencyDesigne: null,
      wirelessStandard: null,
      mimoType: null,
      remark: '',
      gmtCreater: `138${Random.integer(100000000, 999999999)}`,
      "gmtCreatetime": Random.date('yyyy-MM-dd HH:mm:ss'),
      "gmtModified": Random.first(),
      "gmtModifytime": Random.date('yyyy-MM-dd HH:mm:ss'),
      'layAreaCode|1': [2, 4, 5],
      fapHeartbeat: Random.date('yyyy-MM-dd HH:mm:ss'),
      cost: null,
      'secondaryLayArea|1': [
        '肿瘤29',
        '中医科等候区',
        '输液大厅1',
        '等候区',
        '门诊药房',
        '预检等候区',
        '输液大厅2',
        '体检接待候诊区',
        '收费处',
        '导医台',
        '挂号收费',
        '8109病房 8110病房',
        '院长室',
        '11112病房 11103病房 11206病房',
        '外科门诊',
        '外科检查',
        '手术室等候区',
      ],
      'description|1': [
        '双频',
        '室内双频2*2',
        '单频',
        '室内单频2*2',
      ],
      online: Random.integer(0, 20),
      channel: Random.integer(0, 9).toString(),
      channel5: Random.integer(140, 160).toString(),
      ssids: some(wifiSsids).join(', '),
      apUserNum: Random.integer(0, 20),
      apOnlineTime: Random.integer(10000, 99999),
      layAreaFirstCode: Random.integer(100, 199),
      addressImgUrl: null,
      troubleshootingUrl: null,
      step: '一'
    }));

    setTimeout(() => res.json(pack(result, total)), Random.natural(0, 2000));
  });
  router.get('/monitor/onlineUser', (req, res) => {
    const result = [
      {
        "address": "DSA",
        "count": 378
      },
      {
        "address": "门诊药房",
        "count": 362
      },
      {
        "address": "收费处",
        "count": 333
      },
      {
        "address": "挂号收费",
        "count": 290
      },
      {
        "address": "等候区",
        "count": 238
      },
      {
        "address": "候诊区",
        "count": 238
      },
      {
        "address": "护士值班室",
        "count": 229
      },
      {
        "address": "导医台",
        "count": 224
      },
      {
        "address": "导医台",
        "count": 205
      },
      {
        "address": "外科门诊",
        "count": 201
      },
      {
        "address": "专家门诊11",
        "count": 200
      },
      {
        "address": "等候区",
        "count": 196
      },
      {
        "address": "5105病房 5106病房",
        "count": 181
      },
      {
        "address": "诊室14",
        "count": 169
      },
      {
        "address": "放射科",
        "count": 164
      },
      {
        "address": "家属休息区",
        "count": 162
      },
      {
        "address": "产检",
        "count": 161
      },
      {
        "address": "诊室37",
        "count": 161
      },
      {
        "address": "中医科等候区",
        "count": 160
      },
      {
        "address": "观察室",
        "count": 157
      },
      {
        "address": "贵宾输液",
        "count": 154
      },
      {
        "address": "2202房间",
        "count": 153
      },
      {
        "address": "观察室",
        "count": 151
      },
      {
        "address": "挂号收费",
        "count": 150
      },
      {
        "address": "技术值班",
        "count": 148
      },
      {
        "address": "输液大厅1",
        "count": 140
      },
      {
        "address": "彩超等候区",
        "count": 139
      },
      {
        "address": "导医台",
        "count": 138
      },
      {
        "address": "肿瘤29",
        "count": 137
      },
      {
        "address": "挂号收费",
        "count": 136
      },
      {
        "address": "监护室",
        "count": 121
      },
      {
        "address": "导医台9",
        "count": 117
      },
      {
        "address": "检查室40",
        "count": 116
      },
      {
        "address": "等候区",
        "count": 116
      },
      {
        "address": "导医台16",
        "count": 106
      },
      {
        "address": "预检等候区",
        "count": 105
      },
      {
        "address": "输液大厅2",
        "count": 102
      },
      {
        "address": "6105病房 6106病房",
        "count": 102
      },
      {
        "address": "脑外科35",
        "count": 101
      },
      {
        "address": "更衣室",
        "count": 95
      },
      {
        "address": "11105病房 11106病房",
        "count": 93
      },
      {
        "address": "治疗室24",
        "count": 90
      },
      {
        "address": "9105病房 9106病房",
        "count": 82
      },
      {
        "address": "10105病房 10106病房",
        "count": 81
      },
      {
        "address": "专家门诊",
        "count": 80
      },
      {
        "address": "专家门诊22",
        "count": 73
      },
      {
        "address": "耳鼻喉",
        "count": 71
      },
      {
        "address": "7105病房 7106病房",
        "count": 71
      },
      {
        "address": "病理科",
        "count": 70
      },
      {
        "address": "针灸按摩科等候区",
        "count": 67
      },
      {
        "address": "8105病房 8106病房",
        "count": 67
      },
      {
        "address": "6102病房 6103病房 6205病房",
        "count": 65
      },
      {
        "address": "预约准备室",
        "count": 62
      },
      {
        "address": "药房",
        "count": 62
      },
      {
        "address": "急诊输液",
        "count": 61
      },
      {
        "address": "5101病房 5102病房 5103病房 5203病房 5205病房",
        "count": 61
      },
      {
        "address": "VIP病房",
        "count": 58
      },
      {
        "address": "示教室",
        "count": 55
      },
      {
        "address": "办公室",
        "count": 55
      },
      {
        "address": "15105病房 15106病房",
        "count": 53
      },
      {
        "address": "6107病房 6108",
        "count": 52
      },
      {
        "address": "12105病房 12106病房",
        "count": 52
      },
      {
        "address": "诊室9",
        "count": 50
      },
      {
        "address": "医生办公室",
        "count": 47
      },
      {
        "address": "5107病房 5108病房 值班室",
        "count": 47
      },
      {
        "address": "6109病房 6110病房",
        "count": 47
      },
      {
        "address": "13105病房 13106病房",
        "count": 47
      },
      {
        "address": "15110病房 15109病房 15208病房",
        "count": 46
      },
      {
        "address": "5109病房 5110病房",
        "count": 45
      },
      {
        "address": "体检接待候诊区",
        "count": 43
      },
      {
        "address": "7107病房 7108",
        "count": 42
      },
      {
        "address": "检查室",
        "count": 42
      },
      {
        "address": "预留诊室31",
        "count": 41
      },
      {
        "address": "9102病房 9103病房 9206病房",
        "count": 41
      },
      {
        "address": "11107病房 11108病房 11207病房",
        "count": 41
      },
      {
        "address": "手术室等候区",
        "count": 40
      },
      {
        "address": "院长室",
        "count": 40
      },
      {
        "address": "6101病房 6203病房",
        "count": 40
      },
      {
        "address": "10107病房 10108病房 10207病房",
        "count": 39
      },
      {
        "address": "6111病房 6112病房 6206病房",
        "count": 38
      },
      {
        "address": "11110病房 11109病房 11208病房",
        "count": 38
      },
      {
        "address": "8107病房 8108",
        "count": 37
      },
      {
        "address": "等候区",
        "count": 36
      },
      {
        "address": "10116病房 10117病房",
        "count": 36
      },
      {
        "address": "11116病房 11117病房",
        "count": 36
      },
      {
        "address": "13107病房 13108病房 13207病房",
        "count": 36
      },
      {
        "address": "12111病房 12112病房 护士站",
        "count": 35
      },
      {
        "address": "信息科",
        "count": 34
      },
      {
        "address": "7120病房",
        "count": 34
      },
      {
        "address": "11113病房 11115病房 11209病房 11210病房",
        "count": 34
      },
      {
        "address": "9107病房 9108病房 9207病房",
        "count": 33
      },
      {
        "address": "10110病房 10109病房 10208病房",
        "count": 33
      },
      {
        "address": "15111病房 15112病房 护士站",
        "count": 33
      },
      {
        "address": "入口大厅",
        "count": 32
      },
      {
        "address": "5207病房 5208病房 5209病房",
        "count": 32
      },
      {
        "address": "6120病房",
        "count": 32
      },
      {
        "address": "6119病房 6119病房",
        "count": 32
      },
      {
        "address": "11120病房",
        "count": 32
      },
      {
        "address": "13111病房 13112病房 护士站",
        "count": 32
      },
      {
        "address": "药房",
        "count": 31
      },
      {
        "address": "8102病房 8103病房 8205病房",
        "count": 31
      },
      {
        "address": "9111病房 9112病房 护士站",
        "count": 31
      },
      {
        "address": "10111病房 10112病房 护士站",
        "count": 31
      },
      {
        "address": "11111病房 11112病房 护士站",
        "count": 31
      },
      {
        "address": "办公室",
        "count": 30
      },
      {
        "address": "7109病房 7110病房",
        "count": 30
      },
      {
        "address": "7102病房 7103病房 7205病房",
        "count": 30
      },
      {
        "address": "8111病房 8112病房 8206病房",
        "count": 30
      },
      {
        "address": "8109病房 8110病房",
        "count": 30
      },
      {
        "address": "15107病房 15108病房 15207病房",
        "count": 30
      },
      {
        "address": "8113病房 8115病房 8207病房 8208病房 8209病房",
        "count": 29
      },
      {
        "address": "5111病房 5112病房 5113病房 5206病房",
        "count": 28
      },
      {
        "address": "6117病房 6116病房",
        "count": 28
      },
      {
        "address": "6113病房 6115病房 6207病房 6208病房 6209病房",
        "count": 28
      },
      {
        "address": "7119病房 7119病房",
        "count": 28
      },
      {
        "address": "7111病房 7112病房 7206病房",
        "count": 28
      },
      {
        "address": "15116病房 15117病房",
        "count": 28
      },
      {
        "address": "专家门诊19",
        "count": 26
      },
      {
        "address": "副院长办公室",
        "count": 26
      },
      {
        "address": "办公室",
        "count": 26
      },
      {
        "address": "9110病房 9109病房 9208病房",
        "count": 26
      },
      {
        "address": "10113病房 10115病房 10209病房 10210病房",
        "count": 26
      },
      {
        "address": "11112病房 11103病房 11206病房",
        "count": 26
      },
      {
        "address": "15118病房 15119病房",
        "count": 26
      },
      {
        "address": "15113病房 15115病房 15209病房 15210病房",
        "count": 26
      },
      {
        "address": "10118病房 10119病房",
        "count": 25
      },
      {
        "address": "12110病房 12109病房 12208病房",
        "count": 25
      },
      {
        "address": "9113病房 9115病房 9209病房 9210病房",
        "count": 24
      },
      {
        "address": "13120病房",
        "count": 24
      },
      {
        "address": "13116病房 13117病房",
        "count": 24
      },
      {
        "address": "9116病房 9117病房",
        "count": 23
      },
      {
        "address": "10120病房",
        "count": 23
      },
      {
        "address": "10102病房 10103病房 10206病房",
        "count": 23
      },
      {
        "address": "13118病房 13119病房",
        "count": 23
      },
      {
        "address": "13110病房 13109病房 13208病房",
        "count": 23
      },
      {
        "address": "副院长办公室",
        "count": 22
      },
      {
        "address": "7113病房 7115病房 7207病房 7208病房 7209病房",
        "count": 22
      },
      {
        "address": "7101病房 7203病房",
        "count": 22
      },
      {
        "address": "9120病房",
        "count": 22
      },
      {
        "address": "9201病房 9202病房",
        "count": 22
      },
      {
        "address": "12113病房 12115病房 12209病房 12210病房",
        "count": 22
      },
      {
        "address": "13132病房 13103病房 13206病房",
        "count": 22
      },
      {
        "address": "11118病房 11119病房",
        "count": 21
      },
      {
        "address": "15152病房 15103病房 15206病房",
        "count": 21
      },
      {
        "address": "10201病房 10202病房",
        "count": 20
      },
      {
        "address": "12107病房 12108病房 12207病房",
        "count": 20
      },
      {
        "address": "收发室",
        "count": 20
      },
      {
        "address": "外科检查",
        "count": 19
      },
      {
        "address": "8119病房 8119病房",
        "count": 19
      },
      {
        "address": "8117病房 8116病房",
        "count": 19
      },
      {
        "address": "12120病房",
        "count": 19
      },
      {
        "address": "13201病房 13202病房",
        "count": 19
      },
      {
        "address": "小会议室",
        "count": 18
      },
      {
        "address": "11201病房 11202病房",
        "count": 18
      },
      {
        "address": "15201病房 15202病房",
        "count": 18
      },
      {
        "address": "9118病房 9119病房",
        "count": 17
      },
      {
        "address": "13113病房 13115病房 13209病房 13210病房",
        "count": 17
      },
      {
        "address": "12122病房 12103病房 12206病房",
        "count": 16
      },
      {
        "address": "11101病房 11203病房 11205病房",
        "count": 15
      },
      {
        "address": "7117病房 7116病房",
        "count": 14
      },
      {
        "address": "8120病房",
        "count": 14
      },
      {
        "address": "中药库",
        "count": 14
      },
      {
        "address": "办公室",
        "count": 14
      },
      {
        "address": "9101病房 9203病房 9205病房",
        "count": 13
      },
      {
        "address": "10101病房 10203病房 10205病房",
        "count": 13
      },
      {
        "address": "办公室",
        "count": 12
      },
      {
        "address": "后勤部 电工班 药品库",
        "count": 12
      },
      {
        "address": "8101病房 8203病房",
        "count": 12
      },
      {
        "address": "12201病房 12202病房",
        "count": 12
      },
      {
        "address": "15120病房",
        "count": 12
      },
      {
        "address": "15101病房 15203病房 15205病房",
        "count": 12
      },
      {
        "address": "12118病房 12119病房",
        "count": 11
      },
      {
        "address": "12116病房 12117病房",
        "count": 11
      },
      {
        "address": "挂号",
        "count": 11
      },
      {
        "address": "治疗室",
        "count": 10
      },
      {
        "address": "等候区",
        "count": 8
      },
    ];
    setTimeout(() => res.json(pack(result)), Random.natural(0, 2000));
  });
  router.get('/monitor/exportOnlineUser', (req, res) => {
    setTimeout(() => res.json({ result: "http://helian.file.alimmdn.com/2017/10/19/1508390244766_2017-10-19.xls" }), Random.natural(0, 2000));
  });
};
