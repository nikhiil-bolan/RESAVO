/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F8F6F0",
        canvasWarm: "#FDFBF7",
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          700: "#1e446c",
          800: "#16324F",
          900: "#0F243B",
        },
        impact: {
          50: "#eaf6f0",
          100: "#c7e8d6",
          500: "#2C8A63",
          600: "#226E4E",
        },
        route: {
          50: "#ebf4f9",
          100: "#cce4f2",
          500: "#2E6F95",
          600: "#225371",
        },
        amberCustom: {
          50: "#fdf8ec",
          100: "#f9ebd0",
          500: "#E8A33A",
          600: "#D48D23",
        },
        alertCustom: {
          50: "#fdf0f0",
          100: "#f9d7d7",
          500: "#C64B4B",
          600: "#AA3838",
        },
        borderCustom: "#E2E8F0",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(22, 50, 79, 0.06)",
        card: "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
        glowGreen: "0 0 15px rgba(44, 138, 99, 0.25)",
        glowBlue: "0 0 15px rgba(46, 111, 149, 0.25)",
      }
    },
  },
  plugins: [],
}
