'use strict';

var common = require('../common');
var helpers = require('./helpers');
var assert = common.assert;

var stormpath = require('../../');

describe('OAuthPasswordGrantRequestAuthenticator',function(){

  var application;

  var newAccount;

  before(function(done){
    newAccount = helpers.fakeAccount();

    helpers.createApplication(function(err,app){
      application = app;
      application.createAccount(newAccount,done);
    });
  });

  after(function(done){
    helpers.cleanupApplicationAndStores(application, done);
  });

  it('should be constructable with new operator',function(){
    var authenticator = new stormpath.OAuthPasswordGrantRequestAuthenticator(application);
    assert.instanceOf(authenticator,stormpath.OAuthPasswordGrantRequestAuthenticator);
  });

  it('should be constructable without new operator',function(){
    var authenticator = stormpath.OAuthPasswordGrantRequestAuthenticator(application);
    assert.instanceOf(authenticator,stormpath.OAuthPasswordGrantRequestAuthenticator);
  });

  it('should create access tokens',function(done){
    var authenticator = new stormpath.OAuthPasswordGrantRequestAuthenticator(application);
    authenticator.authenticate({
      username: newAccount.username,
      password: newAccount.password
    },common.assertPasswordGrantResponse(done));
  });
});
