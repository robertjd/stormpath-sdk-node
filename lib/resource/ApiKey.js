'use strict';

var utils = require('../utils');
var InstanceResource = require('./InstanceResource');
var crypto = require('crypto');

function ApiKey() {
  ApiKey.super_.apply(this, arguments);
  this.query = Array.prototype.slice.call(arguments).pop();
  this._decrypted = false;
}
utils.inherits(ApiKey, InstanceResource);

ApiKey.prototype.getDecryptedSecret = function(callback) {
  var self = this;
  var salt = self.query.encryptionKeySalt;
  var password = self.dataStore.requestExecutor.options.apiKey.secret;
  var encryptedSecret = new Buffer(self.secret,'base64');
  var iv = encryptedSecret.slice(0,16);
  var rawEncryptedValue = encryptedSecret.slice(16);
  crypto.pbkdf2(password,new Buffer(salt,'base64'),1024,16,function(err,key){
    if(err){
      return callback(err);
    }
    var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    var decrypted = decipher.update(rawEncryptedValue,'hex','utf8');
    decrypted += decipher.final('utf8');
    callback(null,decrypted);
  });

};

ApiKey.prototype.decrypt = function(callback) {
  var self = this;
  if(self._decrypted===false){
    self.getDecryptedSecret(function(err,secret){
      if(err){
        return callback(err);
      }
      self.secret = secret;
      delete self._decrypted;
      self.dataStore.cacheHandler.put(self.href,self,utils.noop);
      callback(null,self);
    });
  }else{
    process.nextTick(callback.bind(null,null,self.secret));
  }
};

module.exports = ApiKey;
