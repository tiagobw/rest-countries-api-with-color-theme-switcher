module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'down-arrow': 'url(/src/images/down-arrow.svg)',
        'down-arrow-white': 'url(/src/images/down-arrow-white.svg)'
      },
    },
    colors: {
      'dark-blue': 'hsl(209, 23%, 22%)',
      'very-dark-blue-background': 'hsl(207, 26%, 17%)',
      'very-dark-blue-text': 'hsl(200, 15%, 8%)',
      'dark-gray-input': 'hsl(0, 0%, 52%)',
      'very-light-gray-background': 'hsl(0, 0%, 98%)',
      'white-text-elements': 'hsl(0, 0%, 100%)',
      'light-gray-text': '#eee'
    },
  },
  plugins: [],
};
