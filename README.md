# rjx

[![Coverage Status](https://coveralls.io/repos/github/repetere/rjx/badge.svg?branch=master)](https://coveralls.io/github/repetere/rjx?branch=master) [![Build Status](https://travis-ci.org/repetere/rjx.svg?branch=master)](https://travis-ci.org/repetere/rjx)

## Description

**rjx** is a javascript module with simple and efficient tools for data mining and data analysis in JavaScript. **rjx** can be used with [ML.js]Reactive JSON - Zero-Configuration React components with JSON

## Installation

```sh
$ npm i rjx #
```

### [Full Documentation](https://github.com/repetere/rjx/blob/master/docs/api.md)

### Usage (basic)

```javascript
"rjx" : {
  loadCSV: [Function: loadCSV], //asynchronously loads CSVs, either a filepath or a remote URI
  cross_validation: {
    train_test_split: [Function: train_test_split], // splits data into training and testing sets
    cross_validation_split: [Function: kfolds], //splits data into k-folds
  },
  preprocessing: {
    Class RawData: [ //class for manipulating an array of objects (typically from CSV data)
      columnArray(columnName,options), // - returns a new array of a selected column from an array of objects, can filter, scale and replace values
      columnReplace(columnName,options), // - returns a new array of a selected column from an array of objects and replaces empty values, encodes values and scales values
      labelEncoder(columnName,options), // - returns a new array and label encodes a selected column
      labelDecode(columnName,options), // - returns a new array and decodes an encoded column back to the original array values
      oneHotEncoder(columnName,options), // - returns a new object of one hot encoded values
      fitColumns(options), // - mutates data property of RawData by replacing multiple columns in a single command
    ]
  },
  util: {
    range: [Function], // range helper function
    rangeRight: [Function], //range right helper function
    scale: [Function: scale], //scale / normalize data
    avg: [Function: arithmeticMean], // aritmatic mean
    mean: [Function: arithmeticMean], // aritmatic mean
    sum: [Function: sum],
    max: [Function: max],
    min: [Function: min],
    sd: [Function: standardDeviation], // standard deviation
    StandardScaler: [Function: StandardScaler], // standardization (z-scores)
    MinMaxScaler: [Function: MinMaxScaler], // min-max scaling
  },
}
```

### Examples (JavaScript / Python / R)

#### Loading CSV Data

##### Javascript

```javascript
import { default as jsk } from 'rjx';
let dataset;

//In JavaScript, by default most I/O Operations are asynchronous, see the notes section for more
jsk.loadCSV('/some/file/path.csv')
  .then(csvData=>{
    dataset = new jsk.RawData(csvData);
    console.log({csvData});
    /* csvData [{
      'Country': 'Brazil',
      'Age': '44',
      'Salary': '72000',
      'Purchased': 'N',
    },
    ...
    {
      'Country': 'Mexico',
      'Age': '27',
      'Salary': '48000',
      'Purchased': 'Yes',
    }] */
  })
  .catch(console.error);

// or from URL
jsk.loadCSV('https://example.com/some/file/path.csv')
```

##### Python

```python
import pandas as pd

#Importing the dataset
dataset = pd.read_csv('/some/file/path.csv')
```

##### R

```R
# Importingd the dataset
dataset = read.csv('Data.csv')
```

### Development

Note *Make sure you have grunt installed*

```sh
$ npm i -g grunt-cli jsdoc-to-markdown
```

For generating documentation

```sh
$ grunt doc
$ jsdoc2md dist/**/*.cjs.js  > docs/api.md
```

### Notes

Check out [https://github.com/repetere/rjx](https://github.com/repetere/rjx) for the full rjx Documentation

### Testing

```sh
$ npm i
$ grunt test
```

### Contributing

Fork, write tests and create a pull request!

### Misc

As of Node 8, ES modules are still used behind a flag, when running natively as an ES module

```sh
$ node --experimental-modules my-machine-learning-script.mjs
# Also there are native bindings that require Python 2.x, make sure if you're using Andaconda, you build with your Python 2.x bin
$ npm i --python=/usr/bin/python
 ```

License

----

MIT