import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Madagascar-inspired colors from the first config
				madagascar: {
					green: {
						50: '#ebf9f1',
						100: '#d7f3e3',
						200: '#aee7c7',
						300: '#86dbab',
						400: '#5ecf8f',
						500: '#36c373',
						600: '#2b9c5c',
						700: '#207544',
						800: '#154e2d',
						900: '#0a2716',
					},
					blue: {
						50: '#edf6fd',
						100: '#daedfb',
						200: '#b5daf7',
						300: '#90c8f3',
						400: '#6bb5ef',
						500: '#46a3eb',
						600: '#3882bc',
						700: '#2a628d',
						800: '#1c415e',
						900: '#0e212f',
					},
					sand: {
						50: '#fcf9f2',
						100: '#f9f2e4',
						200: '#f3e5c9',
						300: '#edd8ae',
						400: '#e7cb93',
						500: '#e1be78',
						600: '#b49860',
						700: '#877248',
						800: '#5a4c30',
						900: '#2d2618',
					},
					coral: {
						50: '#fef3f2',
						100: '#fde6e4',
						200: '#facdc9',
						300: '#f7b3ae',
						400: '#f49a93',
						500: '#f18178',
						600: '#c16760',
						700: '#914d48',
						800: '#603430',
						900: '#301a18',
					},
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-up': {
					from: { 
						transform: 'translateY(10px)',
						opacity: '0'
					},
					to: { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-right': {
					from: { 
						transform: 'translateX(-10px)',
						opacity: '0'
					},
					to: { 
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				// Additional animations from the first config
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'slide-right': 'slide-right 0.3s ease-out',
				// Additional animations from the first config
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'float': 'float 5s ease-in-out infinite',
				'pulse': 'pulse 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;