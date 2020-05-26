export {};

const bcrypt = require('bcrypt');
const Text = require('./Text');

class Word extends Text {
  saltRounds: number;

  constructor(min: number = null, max: number = null, flags: number = null) {
    super(min, max, null, flags);

    this.assert(/[^\w]/, false, 'must contain only alphanumeric characters');
  }

  async parse(value: any) {
    const valid = await super.parse(value);
    if (!valid) {
      return undefined;
    }
    return valid.toLowerCase();
  }
}

module.exports = Word;
