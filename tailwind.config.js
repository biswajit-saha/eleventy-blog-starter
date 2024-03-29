const { colors } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{njk, html, md}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			lineHeight: {
				12: '3rem',
			},
			maxWidth: {
				'1/2': '50%',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						a: {
							'&:hover': {
								color: theme('colors.red.500'),
							},
						},
                        blockquote: {
                            'border-left-color': theme('colors.red.500'),
                        }
					},
				},
			}),
		},
	},
	variants: {
		extend: {
			visibility: ['hover', 'focus', 'group-hover', 'group-focus'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
