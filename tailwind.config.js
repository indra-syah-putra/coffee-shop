import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                espresso: {
                    DEFAULT: '#3E2723',
                    dark: '#261712',
                },
                cream: {
                    DEFAULT: '#FFFFFF',
                    dark: '#FFFAF5',
                },
                gold: {
                    DEFAULT: '#D4AF37',
                    light: '#E6C75A',
                },
                'light-brown': {
                    DEFAULT: '#8D6E63',
                    light: '#A1887F',
                },
            },
        },
    },

    plugins: [forms],
};
