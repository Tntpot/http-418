// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  bracketSameLine: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
