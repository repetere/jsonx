'use strict';
const jsk = require('../../dist/jskit-learn.cjs');
const expect = require('chai').expect;
const testArray = [ 20, 25, 10, 33, 50, 42, 19 ];


describe('util', function () { 
  describe('max', () => {
    it('should return max value', () => {
      expect(jsk.util).to.be.an('object');
      expect(jsk.util.max(testArray)).to.equal(50);   
    });
  });
  describe('min', () => {
    it('should return min value', () => {
      expect(jsk.util.min(testArray)).to.equal(10);   
    });
  });
  describe('mean', () => {
    it('should return mean value', () => {
      expect(jsk.util.mean(testArray)).to.equal(jsk.util.sum(testArray) / testArray.length);   
    });
  });
});