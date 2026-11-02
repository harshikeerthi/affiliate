/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sbloom: {
          canvas: "#FAF7F2",
          surface: "#F3ECE1",
          border: "#E8E2D8",
          text: {
            main: "#12101F",
            secondary: "#575266",
          },
          violet: {
            DEFAULT: "#6B3CFF",
            light: "#845BFF",
            dark: "#5125DB",
          },
          magenta: {
            DEFAULT: "#FF4FA3",
            light: "#FF70B6",
            dark: "#E02E84",
          },
          lime: {
            DEFAULT: "#D6F36B",
            light: "#E3F88E",
            dark: "#B8DB3D",
          },
          admin: {
            DEFAULT: "#0E0B1E",
            card: "#181432",
          },
        },
      },
      fontFamily: {
        fraunces: ['"Fraunces"', 'serif'],
        heading: ['"Fraunces"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'sbloom': '0 10px 30px -5px rgba(18, 16, 31, 0.05), 0 4px 6px -2px rgba(18, 16, 31, 0.03)',
        'sbloom-hover': '0 20px 35px -5px rgba(107, 60, 255, 0.12), 0 8px 10px -4px rgba(18, 16, 31, 0.04)',
        'violet-glow': '0 0 25px rgba(107, 60, 255, 0.25)',
        'lime-glow': '0 0 25px rgba(214, 243, 107, 0.35)',
      },
    },
  },
  plugins: [],
}
