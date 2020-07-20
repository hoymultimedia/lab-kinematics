export default class Utils {
  static propName(prop, value) {
    let res = null;
    /* eslint-disable */
    for (const i in prop) {
      if (typeof prop[i] === 'object') {
        if (this.propName(prop[i], value)) {
          return res;
        }
      } else if (prop[i] === value) {
        res = i;
        return res;
      }
    }
    /* eslint-enable */
    return res;
  }

  static getRandomItem(array) {
    const min = 0;
    const max = array.length - 1;
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    return array[index];
  }

  static removeItem(array, item) {
    return array.filter((e) => e !== item);
  }
}
