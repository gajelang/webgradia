/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        animation: {
          marquee: "marquee var(--duration) linear infinite",
          "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        },
        keyframes: {
          marquee: {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(calc(-100% - var(--gap)))" },
          },
          "marquee-vertical": {
            from: { transform: "translateY(0)" },
            to: { transform: "translateY(calc(-100% - var(--gap)))" },
          },
        },
      },
    },
  };

  /** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        pulse: "pulse var(--duration) ease-out infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
      },
    },
  },
};