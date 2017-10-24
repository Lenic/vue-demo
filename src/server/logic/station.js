import _ from 'underscore';
import Mock, { Random } from 'mockjs';

import pack from './pack';

const depts = [
  {
    "id": 1,
    "deptName": "内科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 4,
    "deptList": [
      {
        "id": 32,
        "deptName": "呼吸内科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 19,
        "deptList": null
      },
      {
        "id": 33,
        "deptName": "消化内科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 34,
        "deptName": "神经内科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 6,
        "deptList": null
      },
      {
        "id": 35,
        "deptName": "心血管内科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 15,
        "deptList": null
      },
      {
        "id": 36,
        "deptName": "血液内科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 37,
        "deptName": "肾病科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 38,
        "deptName": "内分泌科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 39,
        "deptName": "风湿免疫科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 40,
        "deptName": "变态反应科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 41,
        "deptName": "老年病科",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 42,
        "deptName": "其他",
        "parentId": 1,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 9,
        "deptList": null
      }
    ]
  },
  {
    "id": 2,
    "deptName": "外科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 43,
        "deptName": "普外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 33,
        "deptList": null
      },
      {
        "id": 44,
        "deptName": "头颈外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 45,
        "deptName": "肝胆胰外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 46,
        "deptName": "胃肠外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 47,
        "deptName": "肛肠外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 48,
        "deptName": "乳腺外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 49,
        "deptName": "神经外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 9,
        "deptList": null
      },
      {
        "id": 50,
        "deptName": "骨科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 13,
        "deptList": null
      },
      {
        "id": 51,
        "deptName": "脊柱外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 52,
        "deptName": "创伤外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 53,
        "deptName": "关节外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 54,
        "deptName": "手外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 55,
        "deptName": "泌尿外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 10,
        "deptList": null
      },
      {
        "id": 56,
        "deptName": "胸外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 57,
        "deptName": "心脏大血管外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 58,
        "deptName": "烧伤外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 59,
        "deptName": "整形外科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 60,
        "deptName": "周围血管科",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 61,
        "deptName": "其他",
        "parentId": 2,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 3,
    "deptName": "妇产科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 21,
    "deptList": [
      {
        "id": 62,
        "deptName": "妇科",
        "parentId": 3,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 3,
        "deptList": null
      },
      {
        "id": 63,
        "deptName": "产科",
        "parentId": 3,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 3,
        "deptList": null
      },
      {
        "id": 64,
        "deptName": "计划生育专科",
        "parentId": 3,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 65,
        "deptName": "优生专科",
        "parentId": 3,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 66,
        "deptName": "生殖健康与不孕症专科",
        "parentId": 3,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 67,
        "deptName": "其他",
        "parentId": 3,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 4,
    "deptName": "妇女保健科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 68,
        "deptName": "青春期保健专科",
        "parentId": 4,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 69,
        "deptName": "围产期保健专科",
        "parentId": 4,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 70,
        "deptName": "更年期保健专科",
        "parentId": 4,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 71,
        "deptName": "妇女心理卫生专科",
        "parentId": 4,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 72,
        "deptName": "妇女营养专科",
        "parentId": 4,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 73,
        "deptName": "其他",
        "parentId": 4,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 5,
    "deptName": "儿科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 24,
    "deptList": [
      {
        "id": 74,
        "deptName": "小儿传染病科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 75,
        "deptName": "新生儿科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 76,
        "deptName": "小儿消化科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 77,
        "deptName": "小儿呼吸科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 78,
        "deptName": "小儿心脏病科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 79,
        "deptName": "小儿肾病科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 80,
        "deptName": "小儿神经病科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 81,
        "deptName": "小儿内分泌科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 82,
        "deptName": "小儿遗传病科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 83,
        "deptName": "小儿免疫科",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 84,
        "deptName": "其他",
        "parentId": 5,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 4,
        "deptList": null
      }
    ]
  },
  {
    "id": 6,
    "deptName": "小儿外科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 85,
        "deptName": "小儿普外科",
        "parentId": 6,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 86,
        "deptName": "小儿骨科",
        "parentId": 6,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 87,
        "deptName": "小儿泌尿外科",
        "parentId": 6,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 88,
        "deptName": "小儿胸心外科",
        "parentId": 6,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 89,
        "deptName": "小儿神经外科",
        "parentId": 6,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 90,
        "deptName": "其他",
        "parentId": 6,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 7,
    "deptName": "儿童保健科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 91,
        "deptName": "儿童生长发育专科",
        "parentId": 7,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 92,
        "deptName": "儿童营养专科",
        "parentId": 7,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 93,
        "deptName": "儿童心理卫生专科",
        "parentId": 7,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 94,
        "deptName": "儿童五官保健专科",
        "parentId": 7,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 95,
        "deptName": "儿童康复专科",
        "parentId": 7,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 96,
        "deptName": "其他",
        "parentId": 7,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 8,
    "deptName": "眼科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 3,
    "deptList": [
      {
        "id": 97,
        "deptName": "眼视光专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 98,
        "deptName": "眼底病专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 99,
        "deptName": "儿童眼病专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 100,
        "deptName": "白内障专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 101,
        "deptName": "青光眼专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 102,
        "deptName": "眼眶眼肿瘤专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 103,
        "deptName": "眼整形专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 104,
        "deptName": "角膜病专科",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 105,
        "deptName": "其他",
        "parentId": 8,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 9,
    "deptName": "耳鼻咽喉科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 106,
        "deptName": "耳鼻咽喉科",
        "parentId": 9,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 3,
        "deptList": null
      },
      {
        "id": 107,
        "deptName": "其他",
        "parentId": 9,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 10,
    "deptName": "口腔科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 4,
    "deptList": [
      {
        "id": 108,
        "deptName": "牙体牙髓病专科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 109,
        "deptName": "牙周病专科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 110,
        "deptName": "口腔粘膜病专科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 111,
        "deptName": "儿童口腔科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 112,
        "deptName": "口腔颌面外科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 113,
        "deptName": "口腔修复专科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 114,
        "deptName": "口腔正畸专科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 115,
        "deptName": "口腔种植专科",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 116,
        "deptName": "其他",
        "parentId": 10,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 11,
    "deptName": "皮肤科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 117,
        "deptName": "皮肤科",
        "parentId": 11,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 118,
        "deptName": "性传播疾病科",
        "parentId": 11,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 119,
        "deptName": "其他",
        "parentId": 11,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 12,
    "deptName": "急诊医学科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 120,
        "deptName": "急诊医学科",
        "parentId": 12,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 26,
        "deptList": null
      },
      {
        "id": 121,
        "deptName": "其他",
        "parentId": 12,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 13,
    "deptName": "肿瘤科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 122,
        "deptName": "肿瘤科",
        "parentId": 13,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 123,
        "deptName": "其他",
        "parentId": 13,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 14,
    "deptName": "中医科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 124,
        "deptName": "中医内科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 125,
        "deptName": "中西医结合科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 126,
        "deptName": "中医外科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 127,
        "deptName": "中医妇产科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 128,
        "deptName": "中医儿科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 129,
        "deptName": "中医皮肤科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 130,
        "deptName": "中医眼科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 131,
        "deptName": "中医耳鼻咽喉科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 132,
        "deptName": "中医口腔科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 133,
        "deptName": "中医肿瘤科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 134,
        "deptName": "中医骨伤科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 135,
        "deptName": "中医肛肠科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 136,
        "deptName": "中医老年病科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 137,
        "deptName": "针灸科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 138,
        "deptName": "推拿科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 139,
        "deptName": "中医康复科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 140,
        "deptName": "中医治未病科",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 141,
        "deptName": "其他",
        "parentId": 14,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 15,
    "deptName": "医疗美容科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 142,
        "deptName": "医疗美容科",
        "parentId": 15,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 2,
        "deptList": null
      },
      {
        "id": 143,
        "deptName": "其他",
        "parentId": 15,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 16,
    "deptName": "精神科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 144,
        "deptName": "精神卫生科",
        "parentId": 16,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 145,
        "deptName": "药物依赖专科",
        "parentId": 16,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 146,
        "deptName": "精神康复专科",
        "parentId": 16,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 147,
        "deptName": "社区防治专科",
        "parentId": 16,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 148,
        "deptName": "临床心理专科",
        "parentId": 16,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 149,
        "deptName": "司法精神专科",
        "parentId": 16,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 150,
        "deptName": "其他",
        "parentId": 16,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 17,
    "deptName": "全科医疗科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 151,
        "deptName": "全科医疗科",
        "parentId": 17,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 152,
        "deptName": "其他",
        "parentId": 17,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 18,
    "deptName": "感染科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 153,
        "deptName": "肠道传染病专科",
        "parentId": 18,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 154,
        "deptName": "呼吸道传染病专科",
        "parentId": 18,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 155,
        "deptName": "肝炎专科",
        "parentId": 18,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 156,
        "deptName": "其他",
        "parentId": 18,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 19,
    "deptName": "重症医学科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 157,
        "deptName": "重症医学科",
        "parentId": 19,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 5,
        "deptList": null
      },
      {
        "id": 158,
        "deptName": "其他",
        "parentId": 19,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 20,
    "deptName": "康复医学科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 159,
        "deptName": "康复医学科",
        "parentId": 20,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 7,
        "deptList": null
      },
      {
        "id": 160,
        "deptName": "其他",
        "parentId": 20,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 21,
    "deptName": "营养科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 161,
        "deptName": "营养科",
        "parentId": 21,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 162,
        "deptName": "其他",
        "parentId": 21,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 22,
    "deptName": "辅助科室",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 163,
        "deptName": "体检中心",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 164,
        "deptName": "麻醉科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 5,
        "deptList": null
      },
      {
        "id": 165,
        "deptName": "疼痛科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 166,
        "deptName": "医学检验科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 7,
        "deptList": null
      },
      {
        "id": 167,
        "deptName": "药剂科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 168,
        "deptName": "中药房",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 169,
        "deptName": "西药房",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 170,
        "deptName": "输液配置中心",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 171,
        "deptName": "制剂室",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 172,
        "deptName": "病理科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 173,
        "deptName": "放射科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 15,
        "deptList": null
      },
      {
        "id": 174,
        "deptName": "介入放射专科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 175,
        "deptName": "放射治疗科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 176,
        "deptName": "内镜中心",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 4,
        "deptList": null
      },
      {
        "id": 177,
        "deptName": "超声诊断科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 15,
        "deptList": null
      },
      {
        "id": 178,
        "deptName": "核医学科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 179,
        "deptName": "心电诊断科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 5,
        "deptList": null
      },
      {
        "id": 180,
        "deptName": "神经电生理科",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 181,
        "deptName": "肺功能室",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 182,
        "deptName": "血液透析中心",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 183,
        "deptName": "其他",
        "parentId": 22,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 3,
        "deptList": null
      }
    ]
  },
  {
    "id": 23,
    "deptName": "结核病科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 223,
        "deptName": "结核病科",
        "parentId": 23,
        "gmtCreate": "2017-07-24 14:48:47",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 224,
        "deptName": "其他",
        "parentId": 23,
        "gmtCreate": "2017-07-24 14:50:07",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 24,
    "deptName": "地方病科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 222,
        "deptName": "地方病科",
        "parentId": 24,
        "gmtCreate": "2017-07-24 14:48:31",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 225,
        "deptName": "其他",
        "parentId": 24,
        "gmtCreate": "2017-07-24 14:50:40",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 25,
    "deptName": "运动医学科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 226,
        "deptName": "运动医学科",
        "parentId": 25,
        "gmtCreate": "2017-07-24 14:51:54",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 227,
        "deptName": "其他",
        "parentId": 25,
        "gmtCreate": "2017-07-24 14:52:04",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 26,
    "deptName": "职业病科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 221,
        "deptName": "职业病科",
        "parentId": 26,
        "gmtCreate": "2017-07-24 14:46:35",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 228,
        "deptName": "其他",
        "parentId": 26,
        "gmtCreate": "2017-07-24 14:52:34",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 27,
    "deptName": "临终关怀科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 220,
        "deptName": "临终关怀科",
        "parentId": 27,
        "gmtCreate": "2017-07-24 14:46:13",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 229,
        "deptName": "其他",
        "parentId": 27,
        "gmtCreate": "2017-07-24 14:52:56",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 28,
    "deptName": "特种医学与军事医学科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 219,
        "deptName": "特种医学与军事医学科",
        "parentId": 28,
        "gmtCreate": "2017-07-24 14:45:35",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 230,
        "deptName": "其他",
        "parentId": 28,
        "gmtCreate": "2017-07-24 14:53:22",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 29,
    "deptName": "民族医学科",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 184,
        "deptName": "维吾尔医科",
        "parentId": 29,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 185,
        "deptName": "藏医科",
        "parentId": 29,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 186,
        "deptName": "蒙医科",
        "parentId": 29,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 187,
        "deptName": "彝医科",
        "parentId": 29,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 188,
        "deptName": "傣医科",
        "parentId": 29,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 189,
        "deptName": "其他",
        "parentId": 29,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 30,
    "deptName": "职能科室",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 0,
    "deptList": [
      {
        "id": 190,
        "deptName": "预防保健科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 191,
        "deptName": "感染管理科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 192,
        "deptName": "医院办公室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 193,
        "deptName": "党委办公室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 194,
        "deptName": "团委办公室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 195,
        "deptName": "医务科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 3,
        "deptList": null
      },
      {
        "id": 196,
        "deptName": "科教科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 197,
        "deptName": "护理部",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 78,
        "deptList": null
      },
      {
        "id": 198,
        "deptName": "门诊办公室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 5,
        "deptList": null
      },
      {
        "id": 199,
        "deptName": "人力资源部",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 200,
        "deptName": "财务科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 201,
        "deptName": "纪检监察科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 202,
        "deptName": "审计科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 203,
        "deptName": "信息中心",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 204,
        "deptName": "后勤保障科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 6,
        "deptList": null
      },
      {
        "id": 205,
        "deptName": "保卫科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 206,
        "deptName": "基建科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 207,
        "deptName": "设备科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 208,
        "deptName": "采购中心",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 209,
        "deptName": "离退休办公室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 210,
        "deptName": "工会",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 211,
        "deptName": "医疗保险办公室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 212,
        "deptName": "病案室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 213,
        "deptName": "宣传科",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 214,
        "deptName": "对外联络部",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 215,
        "deptName": "图书馆",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      },
      {
        "id": 216,
        "deptName": "质量控制办公室",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 1,
        "deptList": null
      },
      {
        "id": 217,
        "deptName": "其他",
        "parentId": 30,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 0,
        "deptList": null
      }
    ]
  },
  {
    "id": 31,
    "deptName": "其他",
    "parentId": null,
    "gmtCreate": "2017-07-11 15:18:05",
    "deptUserCount": 25,
    "deptList": [
      {
        "id": 218,
        "deptName": "其他",
        "parentId": 31,
        "gmtCreate": "2017-07-11 15:18:05",
        "deptUserCount": 8,
        "deptList": null
      }
    ]
  }
];

module.exports = function (router) {
  router.get('/station/dept', (req, res) => {
    // return res.status(405).json({
    //   "timestamp": "2017-10-18 10:40:00",
    //   "status": 405,
    //   "error": "Method Not Allowed",
    //   "exception": "org.springframework.web.HttpRequestMethodNotSupportedException",
    //   "message": "Request method 'GET' not supported",
    //   "path": "/login"
    // });

    const { deptName } = req.query
      , result = {
        id: Random.integer(1, 1000),
        stationId: req.query.stationId,
        stationName: '建德市第一人民医院',
        hospUserCount: Random.integer(0, 2000),
        depts: deptName ? _.filter(depts, v => v.deptName.indexOf(deptName) >= 0) : depts,
      };

    setTimeout(() => res.json(pack(result)), Random.natural(0, 2000));
  });

  router.get('/station/user', (req, res) => {
    const { page, limit, stationId, deptId, userName } = req.query
      , count = Random.boolean() ? Random.integer(1, limit) : limit;

    const result = _.map(_.range(0, userName ? 1 : count), v => ({
      id: Random.increment(),
      stationId,
      userid: Random.integer(100000000, 999999999).toString(),
      userName: Random.cname(),
      tel: null,
      workplace: null,
      remark: null,
      mobile: `188${Random.integer(10000000, 99999999)}`,
      email: null,
      active: Random.boolean(),
      orderindepts: null,
      isadmin: false,
      isboss: false,
      dingid: null,
      isleaderindepts: null,
      ishide: false,
      department: Random.integer(1000000, 9999999).toString(),
      userType: 2,
      'userPosition|1': [
        '护士',
        '医生',
      ],
      avatar: null,
      jobnumber: null,
      extattr: null,
      userOrder: null,
      isleader: false,
      gmtCreater: null,
      gmtCreatetime: Random.date('yyyy-MM-dd HH:mm:ss'),
      gmtModified: Random.date('yyyy-MM-dd HH:mm:ss'),
      gmtModifytime: Random.date('yyyy-MM-dd HH:mm:ss'),
      sort: 2147483647,
      regUserId: Random.integer(10000000000, 99999999999).toString(),
      role: 'old',
      authStates: 'authed',
      authImg: '/authPic/2016/10/09/|1700126125576246971-92a6-4869-8660-359c23a505ca.jpg',
      authTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      reason: null,
      roleId: 3,
      userNameShort: 'zt',
      isSecret: 0,
      isPushSecret: 0,
      hlDeptId: '1',
      hlDeptName: '内科',
      authId: null,
      deptUserCount: null
    }));

    setTimeout(() => res.json(pack(result, Random.integer(2, 99))), Random.natural(0, 2000));
  });

  router.post('/station/user/save', (req, res) => {
    if (req.body.userName === '张三') {
      setTimeout(() => res.json(pack(null, 0, 999, '用户不为空！')), Random.natural(0, 2000));
    } else {
      setTimeout(() => res.json(pack(0)), Random.natural(0, 2000));
    }
  });

  router.delete('/station/user/delete', (req, res) => res.json({
    'code': 0,
    'errorMsg': 'string',
    'result': 0,
    'total': 0,
  }));
  router.get('/station/alarm', (req, res) => {
    const minCount = req.query.page * req.query.limit
      , total = Random.integer(minCount, 500)
      , count = (total - minCount) % req.query.limit && req.query.limit;

    const result = _.map(_.range(0, count), (v, i) => Mock.mock({
      "id": i,
      "mobile": Random.integer(100000000000, 999999999999).toString(),
      "address|1": [
        '门诊综合楼20F门诊综合楼 20F 两个房间中间',
        '门诊综合楼20F门诊综合楼 21F 三个房间中间',
        '门诊综合楼20F门诊综合楼 22F 四个房间中间',
        '门诊综合楼20F门诊综合楼 23F 五个房间中间',
        '门诊综合楼20F门诊综合楼 24F 六个房间中间',
      ],
      "userName|1": [
        '张三',
        '王五',
        '赵六',
        '李四',
      ],
      "deptName|1": [
        '心血管科',
        '脑科',
        '皮肤科',
        '外科',
      ],
      "status|1": [
        '0',
        '1',
      ],
      "gmtCreatetime": Random.date('yyyy-MM-dd hh:mm:ss'),
    }));

    setTimeout(() => res.json(pack(result, total)), Random.natural(0, 2000));
  });
  router.post('/station/alarm/cancel', (req, res) => {
    setTimeout(() => res.json({ result: 0 }), Random.natural(0, 2000));
  });
  router.post('/station/alarm/mobile/save', (req, res) => {
    setTimeout(() => res.json({ result: 0 }), Random.natural(0, 2000));
  });
  router.get('/station/notice', (req, res) => {
    const minCount = req.query.page * req.query.limit
      , total = Random.integer(minCount, 500)
      , count = (total - minCount) % req.query.limit && req.query.limit;

    const result = _.map(_.range(0, count), (v, i) => Mock.mock({
      "id": i,
      "title|1": [
        '遇“医闹”，摇一摇，保安立刻到',
        '找同事更便捷',
        '随时随地，重要公告一个都不漏',
      ],
      "userName|1": [
        '张三',
        '王五',
        '赵六',
        '李四',
      ],
      "author|1": [
        '心血管科',
        '脑科',
        '皮肤科',
        '外科',
      ],
      "isTop|1": [
        0,
        1,
      ],
      "gmtCreatetime": Random.date('yyyy-MM-dd hh:mm:ss'),
    }));

    setTimeout(() => res.json(pack(result, total)), Random.natural(0, 2000));
  });
  router.post('/station/notice/top', (req, res) => {
    setTimeout(() => res.json({ result: 0 }), Random.natural(0, 2000));
  });
  router.delete('/station/notice/delete', (req, res) => {
    setTimeout(() => res.json({ result: 0 }), Random.natural(0, 2000));
  });
  router.post('/station/notice/save', (req, res) => {
    setTimeout(() => res.json({ result: 0 }), Random.natural(0, 2000));
  });
  router.get('/station/notice/:id', (req, res) => {
    const result = Mock.mock({
      "id": req.params.id,
      "title|1": [
        '遇“医闹”，摇一摇，保安立刻到',
        '找同事更便捷',
        '随时随地，重要公告一个都不漏',
      ],
      "userName|1": [
        '张三',
        '王五',
        '赵六',
        '李四',
      ],
      "author|1": [
        '心血管科',
        '脑科',
        '皮肤科',
        '外科',
      ],
      "isTop|1": [
        0,
        1,
      ],
      "content|1": [
        "<p>滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1滨江分院公告1</p>"
      ],
      "gmtCreatetime": Random.date('yyyy-MM-dd hh:mm:ss'),
    });

    setTimeout(() => res.json(pack(result)), Random.natural(0, 2000));
  });
}
