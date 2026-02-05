import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', 'src/graphql/**/*.graphql'],
  generates: {
    './src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        apolloClientVersion: 4,
        gqlImport: '@apollo/client/core#gql',
        apolloReactCommonImportFrom: '@apollo/client/core',
        apolloReactHooksImportFrom: '@apollo/client/react',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
