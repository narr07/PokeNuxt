import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eef9ff',
          100: '#daf1ff',
          200: '#bde7ff',
          300: '#90daff',
          400: '#5bc2ff',
          500: '#3da9fc',
          600: '#1f88f1',
          700: '#1770de',
          800: '#195bb4',
          900: '#1b4d8d',
          950: '#153056',
        },
        red: {
          50: '#fff1f2',
          100: '#fee5e7',
          200: '#fdced5',
          300: '#fba6b2',
          400: '#f7758a',
          500: '#ef4565',
          600: '#db234e',
          700: '#b91741',
          800: '#9b163d',
          900: '#85163a',
          950: '#4a071b',
        },
        green: {
          50: '#edfffc',
          100: '#c0fff6',
          200: '#81fff0',
          300: '#3affe8',
          400: '#00ebc7',
          500: '#00e2c1',
          600: '#00b7a0',
          700: '#009180',
          800: '#007267',
          900: '#045d55',
          950: '#003a37',
        },

      },
    },
  },
}
