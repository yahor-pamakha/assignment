module.exports = {
  plugins: {
    tailwindcss: {
      config: {
        content: ['./src/**/*.{html,ts}'],
        theme: {
          extend: {},
        },
        plugins: [],
      },
    },

    autoprefixer: {},
  },
};
