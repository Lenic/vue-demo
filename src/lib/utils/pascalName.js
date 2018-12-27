export default function getPascalName(name) {
  if (typeof name !== 'string') {
    throw new Error('The name must be string type.');
  }

  if (!name || !name.length) {
    throw new Error('The name is null or empty.');
  }

  return `${name.substr(0, 1).toUpperCase()}${name.substr(1)}`;
}
