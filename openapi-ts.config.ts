import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: '../aurora-core/build/swagger.json',
  output: `./src/api/`,
  types: {
    enums: 'typescript'
  }
});
