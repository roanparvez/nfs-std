import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"], // required for type-aware linting
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    ignores: [
      "*.config.mjs",
      "*.js",
      "next.config.js",
      "tailwind.config.mjs",
      "postcss.config.mjs",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.stories.tsx",
      ".next/**",
      "node_modules/**",
    ],
  },

  ...compat.config({
    plugins: [
      "react",
      "react-hooks",
      "jsx-a11y",
      "import",
      "@typescript-eslint",
      "security",
      // "unicorn",
    ],

    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:@typescript-eslint/recommended-type-checked",
    ],
    rules: {
      // --- TypeScript ---
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/consistent-type-imports": "error",

      // --- React ---
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // --- JavaScript ---
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",

      // --- Accessibility ---
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",

      // --- Import sorting ---
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "error",

      // --- Unicorn rules ---
      // "unicorn/filename-case": [
      //   "error",
      //   {
      //     cases: {
      //       camelCase: true,
      //       pascalCase: true,
      //     },
      //   },
      // ],
      // "unicorn/prefer-node-protocol": "error",
      // "unicorn/no-null": "off",

      // --- Security rules ---
      "security/detect-object-injection": "off",
      "security/detect-non-literal-fs-filename": "warn",
    },
  }),
];

export default eslintConfig;
