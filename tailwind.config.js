module.exports = {
  mode: 'jit',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ], 
  darkMode: 'class', // or 'media' or 'class'
  presets: [require('./src/utils/tailwind-preset')],
};
