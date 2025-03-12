const { localeOptions } = require("@steadystart/enums");

module.exports = {
  loadLocaleFrom: (lang, ns) => import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default),
  locales: localeOptions.map(locale => locale.toLowerCase()),
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'components', 'fields', 'errors', "enums", "models"],
  }
};
