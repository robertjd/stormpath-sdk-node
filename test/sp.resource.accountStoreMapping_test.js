var common = require('./common');
var sinon = common.sinon;

var async = require('async');


var Group = require('../lib/resource/Group');
var Directory = require('../lib/resource/Directory');
var Application = require('../lib/resource/Application');
var AccountStoreMapping = require('../lib/resource/AccountStoreMapping');
var DataStore = require('../lib/ds/DataStore');


describe('Resources: ', function () {
  "use strict";
  describe('Account Store Mapping resource', function () {
    var dataStore = new DataStore({apiKey: {id: 1, secret: 2}});

    describe('get application', function () {
      var asm, appData, app, app2, accountStoreMapping, sandbox;
      before(function (done) {
        // arrange
        appData = { href: '/application/test/href', name: 'boom'};
        asm = { application: {href: appData.href} };
        accountStoreMapping = new AccountStoreMapping(asm, dataStore);

        sandbox = sinon.sandbox.create();
        sandbox.stub(dataStore.requestExecutor,'execute',function(){
          var args = Array.prototype.slice.call(arguments);
          var cb = args.pop();
          cb(null,appData);
        });

        // act
        async.parallel([
          function getApp(cb) {

            accountStoreMapping.getApplication(function (err, res) {
              app = res;
              cb();
            });
          },
          function getAppWithOptions(cb) {

            accountStoreMapping.getApplication({}, function (err, res) {
              app2 = res;
              cb();
            });
          }
        ], done);
      });

      after(function(){
        sandbox.restore();
      });

      // assert
      it('should get application resource', function () {
        app.href.should.be.deep.equal(appData.href);
        app.name.should.be.deep.equal(appData.name);

        app2.href.should.be.deep.equal(appData.href);
        app2.name.should.be.deep.equal(appData.name);
      });
      it('should be an instance of Application resource', function () {
        app.should.be.an.instanceOf(Application);

        app2.should.be.an.instanceOf(Application);
      });
    });

    describe('get account store', function () {
      function testAccountStore(data, type) {
        return function () {
          var asm, resource, resource2, accountStoreMapping, sandbox;
          before(function (done) {
            // arrange
            asm = { accountStore: {href: data.href} };
            accountStoreMapping = new AccountStoreMapping(asm, dataStore);

            sandbox = sinon.sandbox.create();
            sandbox.stub(dataStore.requestExecutor,'execute',function(){
              var args = Array.prototype.slice.call(arguments);
              var cb = args.pop();
              cb(null,data);
            });

            // act
            async.parallel([
              function getApp(cb) {


                accountStoreMapping.getAccountStore(function (err, res) {
                  resource = res;
                  cb();
                });
              },
              function getAppWithOptions(cb) {

                accountStoreMapping.getAccountStore({}, function (err, res) {
                  resource2 = res;
                  cb();
                });
              }
            ], done);

          });

          after(function(){
            sandbox.restore();
          });

          // assert
          it('should get account store', function () {
            resource.href.should.be.deep.equal(data.href);
            resource.name.should.be.deep.equal(data.name);

            resource2.href.should.be.deep.equal(data.href);
            resource2.name.should.be.deep.equal(data.name);
          });
          it('should be type of ' + type.name + ' resource', function () {
            resource.should.be.an.instanceOf(type);

            resource2.should.be.an.instanceOf(type);
          });
        };
      }

      describe('if store type is directory', testAccountStore({
        href: '/directories/test/href',
        name: 'directory boom'
      }, Directory));

      describe('if store type is group', testAccountStore({
        href: '/groups/test/href',
        name: 'group boom'
      }, Group));
    });

    describe('set application', function () {
      var app, accountStoreMapping;
      before(function () {
        // arrange
        app = { href: '/application/test/href', name: 'boom'};
        accountStoreMapping = new AccountStoreMapping({}, dataStore);

        // act
        accountStoreMapping.setApplication(app);
      });
      // assert
      it('should set application href', function () {
        accountStoreMapping.application.href.should.be.equal(app.href);
      });
    });
    describe('set account store', function () {
      var store, accountStoreMapping;
      before(function () {
        // arrange
        store = { href: '/store/test/href', name: 'boom'};
        accountStoreMapping = new AccountStoreMapping({}, dataStore);

        // act
        accountStoreMapping.setAccountStore(store);
      });
      // assert
      it('should set account store href', function () {
        accountStoreMapping.accountStore.href.should.be.equal(store.href);
      });
    });
  });
});