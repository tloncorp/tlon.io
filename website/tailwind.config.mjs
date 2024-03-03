/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        white: "#FFF",
        blackish: "#1A1818",
        navHover: "#ECF1FB",
        mono: {
          100: "#F5F5F5",
          500: "#999999",
        },
      },
      maxWidth: {
        "inner-sm": "34.375rem", // 550px;
        "inner-md": "52.8125rem", // 845px
        "inner-lg": "70rem", // 1120px
      },
      fontSize: {
        md: [
          "1.25rem", // 20px
          {
            lineHeight: "1.875rem", // 30px
            letterSpacing: "0.00625rem", // 0.1px
          },
        ],
        lg: [
          "1.5rem", // 24px
          {
            lineHeight: "2.1875rem", // 35px
            letterSpacing: "0.00625rem", // 0.1px
          },
        ],
        xl: [
          "2rem", // 32px
          {
            lineHeight: "2.5rem", // 40px
            letterSpacing: "0.00625rem", // 0.1px
          },
        ],
      },
    },
  },
  plugins: [],
};
