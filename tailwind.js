module.exports = {
  purge: [
   './src/**/*.html',
    './src/**/*.svelte',
     './src/**/*.md',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
    	borderWidth: ['dark'],
      borderRadius: ['dark']
    }
  },
  plugins: [],
}
