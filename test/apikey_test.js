'use strict';

var authc = require('../lib/authc');
var tmp = require('tmp');
var fs = require('fs');
var chai = require('chai');

chai.use(require('sinon-chai'));
require('mocha-sinon');


describe('ApiKey', function () {
  var apiKey;
  before(function (done) {
    tmp.file(function _tempFileCreated(err, path, fd) {
      if (err) {
        throw err;
      }
      fs.write(fd, 'apiKey.id = 1234\napiKey.secret = abcd');
      fs.close(fd, function (err) {
        if (err) {
          throw err;
        }
        authc.loadApiKey(path, function (err, _apiKey) {
          if (err) {
            throw err;
          }
          apiKey = _apiKey;
          done();
        });
      });
    });
  });
  it('should have id and secret properties', function () {
    apiKey.id.should.equal('1234');
    apiKey.secret.should.equal('abcd');
  });
});
