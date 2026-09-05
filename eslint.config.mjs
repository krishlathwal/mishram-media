import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // `scripts/shoot.mjs`'s output directory. Gitignored, and it holds a
    // throwaway Chrome profile whose extension bundles are not this project's
    // code — linting them reported 58 errors in Revision 42 that had nothing
    // to do with the site.
    "shots/**",
  ]),
]);

export default eslintConfig;
