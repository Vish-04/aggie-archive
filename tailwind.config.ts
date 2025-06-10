import type { Config } from 'tailwindcss';
// import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        buttonGray: '#D9D9D9',
        mainGray: '#EAEAEA',
        purple: "#EDEFFA",
        darkPurple: "#483183",
        brightPurple: "#8347E7",
        pinkPurple: "#A962D1",
        brightPink: "#EF89F6",
        gradientPink: "#CD72DA",
        lightGradientBlue: "#E7EBFF",
        lightGradientPink: "#FFEDFB",
        lightGradientOrange: "#FFEDF3",
        purpleGray: '#F6F3FF',
        purpleBorderGray: '#AB97CC',
        periwinkle: '#CCCCFF',
      },
       fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [
    // lineClamp
  ],
} satisfies Config;
