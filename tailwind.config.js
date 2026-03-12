/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./Assets/**/*.{html,js,jsx,ts,tsx}",
    "./pages/**/*.{html,js}",
    "./Views/**/*.{html,js}"
  ],
  theme: {
    extend: { 
      backgroundImage: {
        'zoi-main': "url('./Assets/Art/Images/bg-main.png')",
      },

      fontFamily: {
        karantina: ['Karantina-Regular', 'sans-serif'],
        koho: ['KoHo-SemiBold', 'sans-serif'],
        "koho-mid": ['KoHo-Medium', 'sans-serif'],
        "koho-regular" : ['KoHo-Regular', 'sans-serif'],
      },

      fontSize: {
        'size-paragraph': ['1.25rem', {lineHeight: '2rem', letterSpacing: '0.1em'}], // Default fontSize for paragraphs
        'size-header' : ['3rem', {lineHeight: '3.875rem', letterSpacing: '0.03em'}], // Default fontSize for headers
        'size-tab-title' : ['2.5rem', {lineHeight: '2.5rem', letterSpacing: '0.03em'}], // Default fontSize for tab titles
        'size-button' : ['1.25rem', {lineHeight: '2rem', letterSpacing: '0.1em'}], // Default fontSize for tab buttons
      },
    },
  },
  plugins: [],
}

