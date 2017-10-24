import getPascalName from '../utils/pascal-name';

export default function (propertyName, wait = 100) {
  const pascalPropertyName = getPascalName(propertyName)
    , currentName = `current${pascalPropertyName}`
    , delayName = `delaying${pascalPropertyName}`
    , delayTokenName = `__delayToken${pascalPropertyName}`;

  return {
    data: () => ({
      [currentName]: null,
      [delayName]: false,
    }),
    beforeMount() {
      this[currentName] = this[propertyName];
    },
    watch: {
      [propertyName]: function (val, oldVal) {
        if (this[delayTokenName]) {
          clearTimeout(this[delayTokenName]);
          this[delayTokenName] = null;
        }

        if (val !== oldVal) {
          this[delayName] = true;
          this[delayTokenName] = setTimeout(() => {
            this[delayName] = false;
            this[currentName] = val;
          }, wait);
        }
      },
    },
  };
}
