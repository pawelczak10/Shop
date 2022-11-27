// import type { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//   overwrite: true,
//   schema:
//     "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla5eriha491v01uk8ej95q4c/master",
//   documents: "graphql/*.graphql",
//   generates: {
//     "./src/gql/": {
//       preset: "client",
//       plugins: [],
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"],
//     },
//   },
//   overwrite: true,
// };

// export default config;

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla5eriha491v01uk8ej95q4c/master",
  documents: ["graphql/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/graphql.tsx": {
      // preset: 'client',
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  overwrite: true,
};

export default config;
