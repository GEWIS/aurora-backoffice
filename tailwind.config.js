import tailwindcss_primeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px'
    }
  },
  plugins: [tailwindcss_primeui]
};
