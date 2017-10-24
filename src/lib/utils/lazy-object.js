import _ from 'underscore';

import getPascalName from './pascal-name';

export function mapLazyObject(propertyName, defaultValue = {}) {
  return {
    [propertyName]: state => {
      if (!state) {
        return null;
      }

      const propertyValue = state[propertyName];

      return _.has(propertyValue, 'data') ? propertyValue.data : defaultValue;
    },
    [`isLoading${getPascalName(propertyName)}`]: state => {
      if (!state) {
        return null;
      }

      const propertyValue = state[propertyName];

      return _.has(propertyValue, 'loading') ? propertyValue.loading : false;
    },
    [`original${getPascalName(propertyName)}`]: state => {
      if (!state) {
        return null;
      }

      return state[propertyName];
    },
  };
}

export function getLazyObjectNames(propertyName) {
  return [
    propertyName,
    `original${getPascalName(propertyName)}`,
    `isLoading${getPascalName(propertyName)}`,
  ];
}
