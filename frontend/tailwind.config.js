export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'c-primary': 'rgb(var(--c-primary) / <alpha-value>)',
        'c-secondary': 'rgb(var(--c-secondary) / <alpha-value>)',
        'c-light': 'rgb(var(--c-light) / <alpha-value>)',
        'c-distinct': 'rgb(var(--c-distinct) / <alpha-value>)',
        'c-text-main': 'rgb(var(--c-text-main) / <alpha-value>)',
      },
      fontFamily: {
        primaryfont: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}