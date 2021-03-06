/*
 * http://x-team.com/2016/05/setting-up-javascript-testing-tools-for-es6/
 * https://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/
 * https://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/
 */


//const describe = require('mocha').describe;
//const it = require('mocha').it;
//const expect = require('chai').expect;

import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Basic', () => {
  it('should calculate 1 + 1 correctly', () => {
    const expectedResult = 2;
    expect(1 + 1).to.equal(expectedResult);
  });
});

describe('Async', () => {
  it('should call the callback', (done) => {
    setTimeout(() => done(), 500);
  });
});

describe('Promise', () => {
  it('should succeed when promise is resolved', () => {
    const result = Promise.resolve('success');

    return result.then(function(value) {
      expect(value).to.equal('success');
    });
  });
});
