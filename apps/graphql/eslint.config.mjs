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
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          "selector": "NewExpression[callee.name='Error']",
          "message": "Use GraphQLError from src/utils/GraphQLError.ts instead of the built-in Error"
        },
        {
          "selector": "ImportSpecifier[imported.name='GraphQLError'][parent.source.value='graphql']",
          "message": "Use GraphQLError from src/utils/GraphQLError.ts instead of importing from 'graphql'"
        },
        {
          "selector": "NewExpression[callee.name='GraphQLError'][callee.object.name!='utils']",
          "message": "Use GraphQLError from src/utils/GraphQLError.ts instead"
        }
      ]
    }
  },
];


export default eslintConfig; 
