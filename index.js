'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Read and Merge Types
 * @param  {String|Array} basePath directory where types are
 * @return  {Object} return object with types
 */
const apolloMergeTypes = basePath => {
  let object = {
    definitions: [],
    Query: null,
    Mutation: null,
    Subscription: null
  };

  if (Array.isArray(basePath)) {
    basePath.map(pathItem => {
      object = getDefinitions(pathItem, object);
    });
  } else {
    object = getDefinitions(basePath, object);
  }

  let definitions = object.definitions;
  object.Query && definitions.push(object.Query);
  object.Mutation && definitions.push(object.Mutation);
  object.Subscription && definitions.push(object.Subscription);

  return { kind: 'Document', definitions };
};

const getDefinitions = (basePath, object) => {
  const files = fs.readdirSync(basePath);

  files.forEach(item => {
    const type = require(path.join(basePath, item)).default;

    type.definitions.forEach(definition => {
      if (definition.name.value === 'Query') {
        if (!object.Query) {
          object.Query = definition;
        } else {
          object.Query.fields = [...object.Query.fields, ...definition.fields];
        }
      } else if (definition.name.value === 'Mutation') {
        if (!object.Mutation) {
          object.Mutation = definition;
        } else {
          object.Mutation.fields = [
            ...object.Mutation.fields,
            ...definition.fields
          ];
        }
      } else if (definition.name.value === 'Subscription') {
        if (!object.Subscription) {
          object.Subscription = definition;
        } else {
          object.Subscription.fields = [
            ...object.Subscription.fields,
            ...definition.fields
          ];
        }
      } else {
        object.definitions.push(definition);
      }
    });
  });

  return object;
};

module.exports = apolloMergeTypes;
