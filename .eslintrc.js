// eslint-disable-next-line no-undef
module.exports = {
   env: {
     node: true, // Enable Node.js global variables and Node.js scoping
     es2021: true, // Enable modern ECMAScript features
   },
   extends: [
     'eslint:recommended', // Use ESLint's recommended rules
   ],
   parserOptions: {
     ecmaVersion: 6, // ECMAScript 2021
     sourceType: 'script', // Use 'module' if you're using ES Modules
   }
 };
 