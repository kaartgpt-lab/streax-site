// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        bounceSmooth: {
          "0%, 100%": { transform: "translate(-50%,0)" },
          "50%": { transform: "translate(-50%,-10px)" },
        },
      },

      animation: {
        fade_up: "fadeUp 1s ease-out both",
        fade_up_delay_1: "fadeUp 1s ease-out 0.2s both",
        fade_up_delay_2: "fadeUp 1s ease-out 0.4s both",
        fade_up_delay_3: "fadeUp 1s ease-out 0.6s both",

        fade_down: "fadeDown 1s ease-out both",

        float_6: "float 6s ease-in-out infinite",
        float_7: "float 7s ease-in-out infinite",
        float_8: "float 8s ease-in-out infinite",
        float_10: "float 10s ease-in-out infinite reverse",

        bounce_smooth: "bounceSmooth 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
