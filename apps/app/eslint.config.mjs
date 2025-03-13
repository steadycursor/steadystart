import { FlatCompat } from "@eslint/eslintrc";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const rootEslintConfig = resolve(__dirname, "../../.eslintrc.js");

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    rootEslintConfig
  ),
  {
    files: ["**/src/pages/**/*.tsx", "**/src/pages/**/*.ts"],
    rules: {
      "import/no-default-export": "off"
    }
  },
  {
    files: ["**/src/hooks/useQueryParams.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          "paths": [
            {
              "name": "next-translate/setLanguage",
              "message": "Use the internal useTranslation hook from src/hooks instead"
            },
            {
              "name": "next-translate/useTranslation",
              "message": "Use the internal useTranslation hook from src/hooks instead"
            }
          ]
        }
      ]
    }
  }
];


export default eslintConfig;
