/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        white: "#fff",
        blackish: "#1a1818",
        navHover: "#ECF1FB",
        mono: {
          100: "#F5F5F5",
          500: "#999999",
        },
      },
      maxWidth: {
        "inner-sm": "34.375rem",
        "inner-md": "52.8125rem",
        "inner-lg": "75rem",
      },
      fontSize: {
        md: [
          "1.25rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "0.00625rem",
          },
        ],
        lg: [
          "2rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "0.00625rem",
          },
        ],
      },
    },
  },
  plugins: [],
};
