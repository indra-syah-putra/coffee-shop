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
                    DEFAULT: '#2B1814',
                    dark: '#1E110E',
                },
                cream: {
                    DEFAULT: '#FFFDF9',
                    dark: '#F9F5F0',
                },
                gold: {
                    DEFAULT: '#D4AF37',
                    light: '#E3C55A',
                },
                'light-brown': {
                    DEFAULT: '#3D251E',
                    light: '#5A3A30',
                },
            },
        },
    },

    plugins: [forms],
};
