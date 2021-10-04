const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.{njk, html, md}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            lineHeight: {
                '12': '3rem',
            }
        },
    },
    variants: {
        extend: {
            visibility: ['hover', 'focus', 'group-hover', 'group-focus'],
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
