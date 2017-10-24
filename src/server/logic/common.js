import _ from 'underscore';
import Mock, { Random } from 'mockjs';

export function mac() {
  const randomChar = () => Random.integer(0, 15).toString(16)
    , randomUnit = () => `${randomChar()}${randomChar()}`;

  return _.map(_.range(0, 6), () => randomUnit()).join(':');
}

export function some(list) {
  const len = Random.integer(0, list.length)
  let items = list;

  return _.map(_.range(0, len), v => {
    const index = Random.integer(0, items.length - 1)
      , element = items[index];

    items = [
      ...items.slice(0, index),
      ...items.slice(index + 1),
    ];
    return items[Random.integer(0, items.length - 1)]
  });
}
