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
        slate: {
          50: '#f4f8fa',
          100: '#e5edf4',
          200: '#d2e0eb',
          300: '#b2cdde',
          400: '#90b4ce',
          500: '#7299bf',
          600: '#5f84b1',
          700: '#5472a1',
          800: '#495f84',
          900: '#3e4f6a',
          950: '#293242',
        },

      },
    },
  },
}
