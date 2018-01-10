'use strict';
const jsk = require('../../dist/jskit-learn.cjs');
const expect = require('chai').expect;
const testArray = [20, 25, 10, 33, 50, 42, 19, 34, 90, 23, ];


describe('cross_validation', function () { 
  describe('train_test_split', () => {
    const defaultTrainTestSplit = jsk.cross_validation.train_test_split(testArray);
    it('should split dataset with default values', () => {
      expect(jsk.cross_validation).to.be.an('object');
      expect(defaultTrainTestSplit.train.length).to.equal(8);
      expect(defaultTrainTestSplit.test.length).to.equal(2);
    });
    it('should split the data into two arrays', () => {
      const defaultTrainTestSplitArray = jsk.cross_validation.train_test_split(testArray, { return_array: true, });
      const [train, test,] = defaultTrainTestSplitArray;
      expect(train.length).to.equal(8);
      expect(test.length).to.equal(2);
    });
    it('should split with defined test size', () => {
      const defaultTrainTestSplitSize = jsk.cross_validation.train_test_split(testArray, { test_size: 0.4, });
      const { train, test, } = defaultTrainTestSplitSize;
      expect(train.length).to.equal(6);
      expect(test.length).to.equal(4);
    });
    it('should split with defined train size', () => {
      const defaultTrainTestSplitSize = jsk.cross_validation.train_test_split(testArray, { train_size: 0.5, });
      const { train, test, } = defaultTrainTestSplitSize;
      expect(train.length).to.equal(5);
      expect(test.length).to.equal(5);
    });
    it('should use a randomized seed', () => {
      const defaultTrainTestSplitSeed0 = jsk.cross_validation.train_test_split(testArray, { random_state: 0, return_array: true, });
      const defaultTrainTestSplitSeed0a = jsk.cross_validation.train_test_split(testArray, { random_state: 0, return_array: true, });
      const defaultTrainTestSplitSeed1 = jsk.cross_validation.train_test_split(testArray, { random_state: 1, return_array: true, });
      const [train0,] = defaultTrainTestSplitSeed0;
      const [train0a,] = defaultTrainTestSplitSeed0a;
      const [train1,] = defaultTrainTestSplitSeed1;
      expect(train0.toString()).to.equal(train0a.toString());
      expect(train0.toString()).to.not.equal(train1.toString());
    });
  });
  describe('cross_validation_split', () => {
    const defaultCrossValidation = jsk.cross_validation.cross_validation_split(testArray);
    it('should split dataset with default values', () => {
      expect(defaultCrossValidation.length).to.equal(3);
    });
    it('should split the data into k-folds', () => {
      const defaultCrossValidationArray = jsk.cross_validation.cross_validation_split(testArray, {
        folds: 2,
      });
      expect(defaultCrossValidationArray[0].length).to.equal(5);
      expect(defaultCrossValidationArray.length).to.equal(2);
    });
    it('should use a randomized seed', () => {
      const defaultCrossValidationSeed0 = jsk.cross_validation.cross_validation_split(testArray, { random_state: 0, });
      const defaultCrossValidationSeed0a = jsk.cross_validation.cross_validation_split(testArray, { random_state: 0, });
      const defaultCrossValidationSeed1 = jsk.cross_validation.cross_validation_split(testArray, { random_state: 1, });
      
      expect(JSON.stringify(defaultCrossValidationSeed0)).to.equal(JSON.stringify(defaultCrossValidationSeed0a));
      expect(JSON.stringify(defaultCrossValidationSeed0)).to.not.equal(JSON.stringify(defaultCrossValidationSeed1));
    });
  });
});