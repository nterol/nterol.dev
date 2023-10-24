import type { CodegenConfig } from "@graphql-codegen/cli";

const codegenConfig: CodegenConfig = {
  schema: {
    [`${process.env.CMS_ENDPOINT}`]: {
      headers: {
        Authorization: `Bearer ${process.env.CMS_AUTHORIZATION_TOKEN}`,
      },
    },
  },
  documents: ["./graphql/cms/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./graphql/cms/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        enumsAsConst: true,
        inlineFragmentTypes: "combine",
        nonOptionalTypename: true,
        scalars: {
          DateTime: "string",
        },
      },
    },
    "./graphql/cms/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
  // hooks: {
  //   afterOneFileWrite: ['prettier --write', 'eslint --fix'],
  // },
};

export default codegenConfig;
