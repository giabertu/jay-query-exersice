const gulpfile = require('../gulpfile');

require('chai').should();

describe('gulpfile', () => {
  it('should include default task', () => {
    gulpfile.default.should.be.a('function');
  });
});
