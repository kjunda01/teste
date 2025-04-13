import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig({
  files: ["**/*.{js,mjs,cjs}"],
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    "no-unused-vars": "off",
    "no-undef": "error",
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "no-console": "warn",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-multi-spaces": "error",
    "no-return-await": "error",
    "consistent-return": "error",

    indent: ["error", 2],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "space-before-function-paren": ["error", "never"],

    "no-var": "error",
    "prefer-const": "error",
    "no-shadow": "error",
    "no-use-before-define": ["error", { functions: false, classes: true }],

    "prefer-template": "error",
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-duplicate-imports": "error",
    "object-shorthand": ["error", "always"],
  },
});
