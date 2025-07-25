// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
   singleQuote: true,
   printWidth: 100, // Maximum line length
   tabWidth: 3, // Number of spaces per indentation level
   useTabs: false, // Indent with spaces instead of tabs
   semi: true, // Print semicolons at the ends of statements
   trailingComma: 'es5', // Print trailing commas wherever valid in ES5 (objects, arrays, etc.)
   bracketSpacing: true, // Print spaces between brackets in object literals
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
