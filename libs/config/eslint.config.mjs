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
  ...compat.extends(rootEslintConfig),
  {
    files: ["**/*.ts"],
  },
];

export default eslintConfig
