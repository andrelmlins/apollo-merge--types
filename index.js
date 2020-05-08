"use strict";

const fs = require("fs");
const path = require("path");

const getTypes = () => {
  const basePath = path.join(process.cwd(), "/dist/types");
  const files = fs.readdirSync(basePath);

  let definitions = [...scalars().definitions];
  let Query;
  let Mutation;

  files.forEach(item => {
    const type = require(path.join(basePath, item)).default;

    type.definitions.forEach(definition => {
      if (definition.name.value === "Query") {
        if (!Query) {
          Query = definition;
        } else {
          Query.fields = [...Query.fields, ...definition.fields];
        }
      } else if (definition.name.value === "Mutation") {
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

  return { kind: "Document", definitions };
};

export default getTypes;
