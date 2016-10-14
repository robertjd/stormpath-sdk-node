'use strict';

var common = require('../common');
var should = common.should;
var random = common.random;
var Memcached = require('memcached');
var MemcachedStore = require('../../lib/cache/MemcachedStore');
var Cache = require('../../lib/cache/Cache');

var memcachedActionTests = function (memcachedStore) {

  describe('set entry', function () {
    var key;
    var val;
    var entry;

    before(function (done) {
      key = 'key' + random();
      val = 'val' + random();

      memcachedStore.put(key, val, function () {
        memcachedStore.get(key, function (err, ent) {
          entry = ent;
          done();
        });
      });
    });
    after(function (done) {
      memcachedStore.delete(key, done);
    });
    it('should store value', function () {
      should.exist(entry);
    });
    it('stored value should be accessible', function () {
      entry.should.be.equal(val);
    });
  });

  describe('get entry', function () {
    var key;
    var val;

    before(function (done) {
      key = 'key' + random();
      val = 'val' + random();

      memcachedStore.put(key, val, done);
    });
    after(function (done) {
      memcachedStore.delete(key, done);
    });

    it('should return entry if found', function (done) {
      memcachedStore.get(key, function (err, entry) {
        should.not.exist(err);
        should.exist(entry);
        entry.should.be.equal(val);
        done();
      });
    });
    it('should return null if not found', function (done) {
      memcachedStore.get(random(), function (err, entry) {
        should.not.exist(err);
        should.not.exist(entry);
        done();
      });
    });
  });

  describe('delete entry', function () {
    var key;
    var val;

    before(function (done) {
      key = 'key' + random();
      val = 'val' + random();

      memcachedStore.put(key, val, done);
    });
    it('should remove entry from store', function (done) {
      memcachedStore.delete(key, function () {
        memcachedStore.get(key, function (err, entry) {
          should.not.exist(entry);
          done();
        });
      });
    });
  });

  describe('clear cache', function () {
    var key;
    var val;

    before(function (done) {
      key = 'key' + random();
      val = 'val' + random();

      memcachedStore.put(key, val, done);
    });
    it('should remove all entries from store', function (done) {
      memcachedStore.clear(function () {
        memcachedStore.get(key, function (err, entry) {
          should.not.exist(entry);
          done();
        });
      });
    });
  });

  describe('cache size', function () {
    var key;
    var val;

    before(function (done) {
      key = 'key' + random();
      val = 'val' + random();

      memcachedStore.clear(function () {
        memcachedStore.put(key, val, done);
      });
    });
    it('should return store size', function (done) {
      memcachedStore.size(function (err, size) {
        size.should.be.gte(1);
        done();
      });
    });
  });
};

describe('Memcached cache', function () {
  describe('without a predefined memcached client', function () {
    var memcachedStore = new Cache(MemcachedStore);
    memcachedActionTests(memcachedStore);
  });
  describe('with a predefined memcached client', function () {
    var memcachedStore = new Cache({
      store: MemcachedStore,
      client: new Memcached()
    });
    memcachedActionTests(memcachedStore);
  });
});
