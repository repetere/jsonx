'use strict';
const path = require('path');
const jsk = require('../../dist/jskit-learn.cjs');
const expect = require('chai').expect;

describe('loadCSV', function () { 
  describe('loading CSV from File', () => {
    it('should load a csv from a filepath', (done) => {
      expect(jsk.loadCSV).to.be.an('function');
      jsk.loadCSV(path.join(__dirname, '../mock/data.csv'))
        .then(csv => {
          expect(csv.length).to.be.greaterThan(0);
          done();
        })
        .catch(done);    
    });
    it('should handle errors with invalid files', (done) => {
      jsk.loadCSV(path.join(__dirname, '../mock/invalid-file.csv'))
        .then(() => {
          done(new Error('should not load CSV'));
        })
        .catch(err => {
          expect(err).to.be.an('error');
          done();
        });
    });
  });
  describe('loading CSV from remote URI', () => {
    it('should load a csv from a remote URI', (done) => {
      // jsk.loadCSV('https://www.arttimesjournal.com/data/events-August-2015.csv')
      jsk.loadCSV('https://raw.githubusercontent.com/repetere/jskit-learn/master/test/mock/data.csv')
        .then(csv => {
          expect(csv.length).to.be.greaterThan(0);
          done();
        })
        .catch(done);      
    });
    it('should handle errors with invalid url', (done) => {
      jsk.loadCSV('https://raw.githubusercontent.com/repetere/jskit-learn/master/test/mock/INVALID.csv')
        .then(csv => {
          expect(csv.length).to.be.equal(0);
          done();
        })
        .catch(done); 
    });
    it('should load a csv from a remote URI directly', (done) => {
      expect(jsk.loadCSVURI).to.be.an('function');
      // jsk.loadCSV('https://www.arttimesjournal.com/data/events-August-2015.csv')
      jsk.loadCSVURI('https://raw.githubusercontent.com/repetere/jskit-learn/master/test/mock/data.csv')
        .then(csv => {
          expect(csv.length).to.be.greaterThan(0);
          done();
        })
        .catch(done);      
    });
    it('should handle errors with invalid url directly', (done) => {
      jsk.loadCSVURI('https://raw.githubusercontent.com/repetere/jskit-learn/master/test/mock/INVALID.csv')
        .then(csv => {
          expect(csv.length).to.be.equal(0);
          done();
        })
        .catch(done); 
    });
  });
});