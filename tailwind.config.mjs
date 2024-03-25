/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  important: true,
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        white: "#FFF",
        blackish: "#1A1818",
        navHover: "#ECF1FB",
        primary: "#3B80E8",
        mono: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          500: "#999999",
          600: "#666666",
          700: "#4C4C4C",
          800: "#322E2E",
        },
      },
      maxWidth: {
        "inner-xs": "34.375rem", // 550px;
        "inner-sm": "46.875rem", // 750px
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
          "1.75rem", // 28px
          {
            lineHeight: "2.5rem", // 40px
            letterSpacing: "0.00625rem", // 0.1px
          },
        ],
        "2xl": [
          "2rem", // 32px
          {
            lineHeight: "2.5rem", // 40px
            letterSpacing: "0.00625rem", // 0.1px
          },
        ],
      },
      boxShadow: {
        inverted: "0 0 30px rgba(255, 255, 255, 0.1)",
      },
      typography: ({ theme }) => ({
        tlon: {
          css: {
            "--tw-prose-body": theme("colors.blackish"),
            "--tw-prose-headings": theme("colors.blackish"),
            "--tw-prose-lead": theme("colors.blackish"),
            "--tw-prose-links": theme("colors.blackish"),
            "--tw-prose-bold": theme("colors.blackish"),
            "--tw-prose-counters": theme("colors.blackish"),
            "--tw-prose-bullets": theme("colors.blackish"),
            "--tw-prose-hr": theme("colors.blackish"),
            "--tw-prose-quotes": theme("colors.mono[600]"),
            "--tw-prose-quote-borders": theme("colors.mono[200]"),
            "--tw-prose-captions": theme("colors.blackish"),
            "--tw-prose-code": theme("colors.blackish"),
            "--tw-prose-pre-code": theme("colors.blackish"),
            "--tw-prose-pre-bg": theme("colors.white"),
            "--tw-prose-th-borders": theme("colors.blackish"),
            "--tw-prose-td-borders": theme("colors.blackish"),
            "--tw-prose-invert-body": theme("colors.white"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.white"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.white"),
            "--tw-prose-invert-bullets": theme("colors.white"),
            "--tw-prose-invert-hr": theme("colors.white"),
            "--tw-prose-invert-quotes": theme("colors.white"),
            "--tw-prose-invert-quote-borders": theme("colors.mono[600]"),
            "--tw-prose-invert-captions": theme("colors.white"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.white"),
            "--tw-prose-invert-pre-bg": theme("colors.white"),
            "--tw-prose-invert-th-borders": theme("colors.white"),
            "--tw-prose-invert-td-borders": theme("colors.white"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
