var common = require('./common');
var sinon = common.sinon;

var Account = require('../lib/resource/Account');
var Group = require('../lib/resource/Group');
var Tenant = require('../lib/resource/Tenant');
var Directory = require('../lib/resource/Directory');
var DataStore = require('../lib/ds/DataStore');

describe('Resources: ', function () {
  describe('Directory resource', function () {
    var dataStore = new DataStore({apiKey: {id: 1, secret: 2}});

    describe('get accounts', function () {
      describe('if accounts not set', function () {
        var directory = new Directory();

        function getAccountsWithoutHref() {
          directory.getAccounts();
        }

        it('should throw unhandled exception', function () {
          getAccountsWithoutHref.should
            .throw(/cannot read property 'href' of undefined/i);
        });
      });

      describe('if accounts are set', function () {
        var sandbox, directory, getResourceStub, cbSpy, app, opt;
        before(function () {
          sandbox = sinon.sandbox.create();
          app = {accounts: {href: 'boom!'}};
          opt = {};
          directory = new Directory(app, dataStore);
          getResourceStub = sandbox.stub(dataStore, 'getResource', function (href, options, ctor, cb) {
            cb();
          });
          cbSpy = sandbox.spy();

          // call without optional param
          directory.getAccounts(cbSpy);
          // call with optional param
          directory.getAccounts(opt, cbSpy);
        });
        after(function () {
          sandbox.restore();
        });

        it('should get accounts', function () {
          /* jshint -W030 */
          getResourceStub.should.have.been.calledTwice;
          cbSpy.should.have.been.calledTwice;
          /* jshint +W030 */

          // call without optional param
          getResourceStub.should.have.been
            .calledWith(app.accounts.href, null, Account, cbSpy);
          // call with optional param
          getResourceStub.should.have.been
            .calledWith(app.accounts.href, opt, Account, cbSpy);
        });
      });
    });

    describe('create account', function () {
      describe('if accounts not set', function () {
        var directory = new Directory();

        function createAccountWithoutHref() {
          directory.createAccount();
        }

        it('should throw unhandled exception', function () {
          createAccountWithoutHref.should
            .throw(/cannot read property 'href' of undefined/i);
        });
      });

      describe('if accounts are set', function () {
        var sandbox, directory, createResourceStub, cbSpy, acc, app, opt;
        before(function () {
          sandbox = sinon.sandbox.create();
          acc = {};
          app = {accounts: {href: 'boom!'}};
          opt = {};
          directory = new Directory(app, dataStore);
          createResourceStub = sandbox.stub(dataStore, 'createResource',
            function (href, options, account, ctor, cb) {
              cb();
            });
          cbSpy = sandbox.spy();

          // call without optional param
          directory.createAccount(acc, cbSpy);
          // call with optional param
          directory.createAccount(acc, opt, cbSpy);
        });
        after(function () {
          sandbox.restore();
        });

        it('should create account', function () {
          /* jshint -W030 */
          createResourceStub.should.have.been.calledTwice;
          cbSpy.should.have.been.calledTwice;
          /* jshint +W030 */

          // call without optional param
          createResourceStub.should.have.been
            .calledWith(app.accounts.href, null, acc, Account, cbSpy);
          // call with optional param
          createResourceStub.should.have.been
            .calledWith(app.accounts.href, opt, acc, Account, cbSpy);
        });
      });
    });

    describe('get groups', function () {
      describe('if groups href not set', function () {
        var directory = new Directory();

        function getAccountsWithoutHref() {
          directory.getGroups();
        }

        it('should throw unhandled exception', function () {
          getAccountsWithoutHref.should
            .throw(/cannot read property 'href' of undefined/i);
        });
      });

      describe('if groups href are set', function () {
        var sandbox, directory, getResourceStub, cbSpy, app, opt;
        before(function () {
          sandbox = sinon.sandbox.create();
          app = {groups: {href: 'boom!'}};
          opt = {};
          directory = new Directory(app, dataStore);
          getResourceStub = sandbox.stub(dataStore, 'getResource', function (href, options, ctor, cb) {
            cb();
          });
          cbSpy = sandbox.spy();

          // call without optional param
          directory.getGroups(cbSpy);
          // call with optional param
          directory.getGroups(opt, cbSpy);
        });
        after(function () {
          sandbox.restore();
        });

        it('should get groups', function () {
          /* jshint -W030 */
          getResourceStub.should.have.been.calledTwice;
          cbSpy.should.have.been.calledTwice;
          /* jshint +W030 */

          // call without optional param
          getResourceStub.should.have.been
            .calledWith(app.groups.href, null, Group, cbSpy);
          // call with optional param
          getResourceStub.should.have.been
            .calledWith(app.groups.href, opt, Group, cbSpy);
        });
      });
    });

    describe('create group', function () {
      describe('if groups href not set', function () {
        var directory = new Directory();

        function createGroupWithoutHref() {
          directory.createGroup();
        }

        it('should throw unhandled exception', function () {
          createGroupWithoutHref.should
            .throw(/cannot read property 'href' of undefined/i);
        });
      });

      describe('if groups href are set', function () {
        var sandbox, directory, createResourceStub, cbSpy, group, app, opt;
        before(function () {
          sandbox = sinon.sandbox.create();
          group = {};
          app = {groups: {href: 'boom!'}};
          opt = {};
          directory = new Directory(app, dataStore);
          createResourceStub = sandbox.stub(dataStore, 'createResource',
            function (href, options, groups, ctor, cb) {
              cb();
            });
          cbSpy = sandbox.spy();

          // call without optional param
          directory.createGroup(group, cbSpy);
          // call with optional param
          directory.createGroup(group, opt, cbSpy);
        });
        after(function () {
          sandbox.restore();
        });

        it('should create account', function () {
          /* jshint -W030 */
          createResourceStub.should.have.been.calledTwice;
          cbSpy.should.have.been.calledTwice;
          /* jshint +W030 */

          // call without optional param
          createResourceStub.should.have.been
            .calledWith(app.groups.href, null, group, Group, cbSpy);
          // call with optional param
          createResourceStub.should.have.been
            .calledWith(app.groups.href, opt, group, Group, cbSpy);
        });
      });
    });

    describe('get tenant', function () {
      describe('if tenants href not set', function () {
        var directory = new Directory();

        function getAccountsWithoutHref() {
          directory.getTenant();
        }

        it('should throw unhandled exception', function () {
          getAccountsWithoutHref.should
            .throw(/cannot read property 'href' of undefined/i);
        });
      });

      describe('if tenants href are set', function () {
        var sandbox, directory, getResourceStub, cbSpy, app, opt;
        before(function () {
          sandbox = sinon.sandbox.create();
          app = {tenant: {href: 'boom!'}};
          opt = {};
          directory = new Directory(app, dataStore);
          getResourceStub = sandbox.stub(dataStore, 'getResource', function (href, options, ctor, cb) {
            cb();
          });
          cbSpy = sandbox.spy();

          // call without optional param
          directory.getTenant(cbSpy);
          // call with optional param
          directory.getTenant(opt, cbSpy);
        });
        after(function () {
          sandbox.restore();
        });

        it('should get tenants', function () {
          /* jshint -W030 */
          getResourceStub.should.have.been.calledTwice;
          cbSpy.should.have.been.calledTwice;
          /* jshint +W030 */

          // call without optional param
          getResourceStub.should.have.been
            .calledWith(app.tenant.href, null, Tenant, cbSpy);
          // call with optional param
          getResourceStub.should.have.been
            .calledWith(app.tenant.href, opt, Tenant, cbSpy);
        });
      });
    });
  });
});