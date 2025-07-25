// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  htmlWhitespaceSensitivity: "ignore",
  bracketSameLine: true,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
