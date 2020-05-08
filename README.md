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

**Javascript**

```js
const { ApolloServer } = require('apollo-server-express');
const apolloMergeTypes = require('apollo-merge-types');

const basePath = path.join(process.cwd(), '/src/types');
const server = new ApolloServer({
  // ...
  typeDefs: apolloMergeTypes(basePath)
  // ...
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

**Typescript**

```js
import { ApolloServer } from 'apollo-server-express';
import apolloMergeTypes from 'apollo-merge-types';

const basePath: string = path.join(process.cwd(), '/src/types');
const server = new ApolloServer({
  // ...
  typeDefs: apolloMergeTypes(basePath)
  // ...
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## NPM Statistics

Download stats for this NPM package

[![NPM](https://nodei.co/npm/apollo-merge-types.png)](https://nodei.co/npm/apollo-merge-types/)

## License

Apollo Merge Types is open source software [licensed as MIT](https://github.com/andrelmlins/apollo-merge-types/blob/master/LICENSE).
