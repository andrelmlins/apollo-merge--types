# Apollo Merge Types

Merge multiples types for apollo-server

[![npm version](https://badge.fury.io/js/apollo-merge-types.svg)](https://www.npmjs.com/package/apollo-merge-types) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andrelmlins/apollo-merge-types/blob/master/LICENSE) [![Build Status](https://travis-ci.com/andrelmlins/apollo-merge-types.svg?branch=master)](https://travis-ci.com/andrelmlins/apollo-merge-types)

## Install

```
npm install apollo-merge-types
```

or

```
yarn add apollo-merge-types
```

## Usage

**Call Async**

```js
const choosePort = require('choose-port');

choosePort(8000, '127.0.0.1', portValid => {
  console.log('Chosen port:', portValid);
});
```

**Call Sync**

```js
const { choosePortSync } = require('choose-port');

const portValid = choosePortSync(8000, '127.0.0.1');

console.log(portValid);
```

## NPM Statistics

Download stats for this NPM package

[![NPM](https://nodei.co/npm/apollo-merge-types.png)](https://nodei.co/npm/apollo-merge-types/)

## License

Apollo Merge Types is open source software [licensed as MIT](https://github.com/andrelmlins/apollo-merge-types/blob/master/LICENSE).
