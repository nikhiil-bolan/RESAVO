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
        canvas: "#F8F7F4",
        navy: {
          50: "#f2f5f8",
          100: "#e1e7f0",
          800: "#1b3757",
          900: "#16324F",
        },
        impact: {
          50: "#eaf5f0",
          500: "#2C8A63",
          600: "#247352",
        },
        route: {
          50: "#ebf3f7",
          500: "#2E6F95",
        },
        amberCustom: {
          50: "#fdf8ec",
          500: "#E8A33A",
        },
        alertCustom: {
          50: "#faecec",
          500: "#C64B4B",
        },
        borderCustom: "#D8DEE3",
      },
    },
  },
  plugins: [],
}
