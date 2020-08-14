// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
 // API_ENDPOINT: 'http://localhost:3000/api/v1/',
 API_ENDPOINT: 'https://climeback.herokuapp.com/api/v1/',
  BASE_ROUTE: 'http://localhost/',
  HOSTNAME: 'localhost',
  BASE_URL: 'localhost:4200',
  HTTPS: false,
};
