# API Testing with TypeScript, Jest, and Got

## Stack

A basic set of packages to test API with TypeScript and HTTP client:

- [Jest](https://jestjs.io) — testing framework;
- [Jest-extended](https://jest-extended.jestcommunity.dev) — additional Jest matchers;
- [Got](https://github.com/sindresorhus/got) — library for HTTP requests;
- [Ajv](https://ajv.js.org) — JSON schema validator;
- [date-fns](https://date-fns.org) — library for dates;
- [Prettier](https://prettier.io) — code formatter;
- [ESLint](https://eslint.org/) – code linter.

Example API for testing: [APOD NASA API](https://api.nasa.gov).

## How to Use

1. Clone repository
2. Install dependencies: `npm install`
3. Run tests: `npm run test`

### CLI Options

- Different tested host could be passed to tests through `.env` variable (it can be useful for testing different environments):

`HOST=https://api.nasa.gov npm test`

- Individual API key could be passed to tests through `.env` variable (otherwise, it will be used `DEMO_KEY` value):

`API_KEY={api_key} npm test`

- Run a single test or tests [that match a specific filename](https://jestjs.io/docs/cli#running-from-the-command-line) (for example `epic.test.ts`):

`npm test epic`

## Examples of Test Cases

- `apod.test.ts` — test with JSON schema validation;
- `epic.test.ts` — test has [a loop through array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) for checking elements with jest-extended assert;
- `insight-weather.test.ts` — test will be conditionally [skipped](https://jestjs.io/docs/api#describeskipname-fn) in an inappropriate environment.

---

### Story about updating packages (2023-11-23) to the latest versions

There were a lot of problems with the last versions of configuration Got and Jest and TypeScript:

1. Got from the 12 version requires only ESM and requires:
   - `"module": "node16",`
   - `"moduleResolution": "node16"` in tsconfig file (as it told in [the last release notes](https://github.com/sindresorhus/got/releases/tag/v13.0.0));
2. Due to the setting above, if you import .ts files inside your .ts files (like I do to import utils' functions inside tests), you need to add:
   - `"noEmit": true,`
   - `"emitDeclarationOnly": false,`
   - `"allowImportingTsExtensions": true` in tsconfig file too;
3. Then you need to add `"type": "module"` in `package.json` for using `import` in .ts files;
4. But with this setting, the whole Jest stops working and requires a different launch method, as told in Jest's documentation about [experimental support for ECMAScript Modules](https://jestjs.io/docs/ecmascript-modules):
   - `node --experimental-vm-modules ./node_modules/.bin/jest`
5. And even this does not work without [ts-jest](https://github.com/kulshekhar/ts-jest) package and jest.config.ts settings:
   - `transform: {'^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }]},`
   - `extensionsToTreatAsEsm: ['.ts']`
6. Last but not least, changing filetype from `jest.config.js` to `jest.config.ts` leads to more configuration changes (I don't remember how)…

I would recommend using [Axios](https://axios-http.com/) as an HTTP client to make setup process much easier (if you do not need specific features of Got). But in this repository, I continue to use Got, because _this is the way._

Example of Jest + Axios can be found [here](https://github.com/adequatica/api-testing-comparison).

**Contemporary API testing stack on [Vitest](https://vitest.dev/) + Node.js [`fetch()`](https://nodejs.org/dist/latest-v21.x/docs/api/globals.html#fetch) can be found [here](https://github.com/adequatica/api-vitesting).**
