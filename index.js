'use strict';

const fs = require('fs');

/**
 * Read and Merge Types
 * @param  {String|Array} path directory where types are
 * @return  {Object} return object with types
 */
const apolloMergeTypes = path => {
  const files = fs.readdirSync(path);

  let definitions = [...scalars().definitions];
  let Query;
  let Mutation;

  files.forEach(item => {
    const type = require(path.join(path, item)).default;

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
};

module.exports = apolloMergeTypes;
