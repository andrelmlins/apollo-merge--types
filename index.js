'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Read and Merge Types
 * @param  {String|Array} basePath directory where types are
 * @return  {Object} return object with types
 */
const apolloMergeTypes = basePath => {
  if (Array.isArray(basePath)) {
    let definitions = [];
    let Query;
    let Mutation;

    basePath.map(pathItem => {
      const files = fs.readdirSync(pathItem);

      files.forEach(item => {
        const type = require(path.join(pathItem, item)).default;

        type.definitions.forEach(definition => {
          if (definition.name.value === 'Query') {
            if (!Query) {
              Query = definition;
            } else {
              Query.fields = [...Query.fields, ...definition.fields];
            }
          } else if (definition.name.value === 'Mutation') {
            if (!Mutation) {
              Mutation = definition;
            } else {
              Mutation.fields = [...Mutation.fields, ...definition.fields];
            }
          } else {
            definitions.push(definition);
          }
        });
      });

      Query && definitions.push(Query);
      Mutation && definitions.push(Mutation);
    });

    return { kind: 'Document', definitions };
  } else {
    const files = fs.readdirSync(basePath);

    let definitions = [];
    let Query;
    let Mutation;

    files.forEach(item => {
      const type = require(path.join(basePath, item)).default;

      type.definitions.forEach(definition => {
        if (definition.name.value === 'Query') {
          if (!Query) {
            Query = definition;
          } else {
            Query.fields = [...Query.fields, ...definition.fields];
          }
        } else if (definition.name.value === 'Mutation') {
          if (!Mutation) {
            Mutation = definition;
          } else {
            Mutation.fields = [...Mutation.fields, ...definition.fields];
          }
        } else {
          definitions.push(definition);
        }
      });
    });

    Query && definitions.push(Query);
    Mutation && definitions.push(Mutation);

    return { kind: 'Document', definitions };
  }
};

module.exports = apolloMergeTypes;
