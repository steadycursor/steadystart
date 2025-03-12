const { localeOptions } = require("@steadystart/enums");

module.exports = {
  contextSeparator: '_',
  createOldCatalogs: false,
  defaultNamespace: '',
  defaultValue: '',
  indentation: 2,
  keepRemoved: false,
  keySeparator: '.',
  lexers: {
    hbs: ['HandlebarsLexer'],
    handlebars: ['HandlebarsLexer'],
    htm: ['HTMLLexer'],
    html: ['HTMLLexer'],
    mjs: ['JavascriptLexer'],
    js: ['JavascriptLexer'],
    ts: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
  },
  lineEnding: 'auto',
  locales: localeOptions.map(locale => locale.toLowerCase()),
  namespaceSeparator: ':',
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: [
    'src/**/*.{ts,tsx}',
    "../../libs/enums/src/generated/enums-for-locale-extraction.ts",
    "../../libs/errors/src/generated/errors-for-locale-extraction.ts"
  ],
  reactNamespace: false,
  sort: true,
  skipDefaultValues: false,
  useKeysAsDefaultValue: true,
  verbose: false,
  customValueTemplate: null,
};
