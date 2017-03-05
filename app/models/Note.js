
const uuidV4 = require('uuid/v4');

export default class Note {

  schema = {
    id: 'string',
    title: 'string',
    description: 'string',
    date: 'object',
  };

  // Property
  id = `${uuidV4()}`;
  title = '';
  description = '';
  date = new Date();

  constructor(args) {
    this.setAllValue(args);
  }

  setAllValue(args) {
    Object.entries(args).forEach(([key, value]) => {
      if (this.validate(key, value)) {
        this[key] = value;
      }
    });
  }

  validate(key, data) {
    let result = false;
    if (key in this.schema) {
      const validType = this.schema[key];
      if (validType === typeof (data)) { // eslint-disable-line
        result = true;
      }
    }
    return result;
  }
}
