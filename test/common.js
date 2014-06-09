"use strict";

var _ = require('lodash');
//_.extend(process.env, require('./test.env'));

var chai = require("chai");
var sinon = require("sinon");
var assert = require('chai').assert;
var should = require("chai").should();
var moment = require('moment');
var sinonChai = require("sinon-chai");

var Stormpath = require('../lib');
chai.use(sinonChai);

function u(){}
u.BASE_URL = 'https://api.stormpath.com/v1';
/** adds '/v1' to relative URL, to work with nock request mocker  */
u.v1 = function(s){return '/v1' + s;};

function random(){
  return '' + Math.random()*Date.now();
}


module.exports = {
  _: _,
  u: u,
  chai: chai,
  sinon: sinon,
  assert: assert,
  expect: chai.expect,
  config: process.env,
  should: should,
  moment: moment,
  Stormpath: Stormpath,
  random: random
};