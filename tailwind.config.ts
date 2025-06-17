import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

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
				foreground: 'hsl(var(--foreground))', // Mapped to PRD primaryText via CSS var
        primaryText: 'hsl(var(--foreground))', // Allows using 'text-primaryText' as per PRD typography examples
        secondaryText: 'hsl(var(--muted-foreground))', // Allows using 'text-secondaryText', mapped to PRD secondaryText via CSS var
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Mapped to PRD accent via CSS var
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Mapped to PRD accentSecondary via CSS var
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))', // Mapped to PRD error via CSS var
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))' // Mapped to PRD secondaryText via CSS var
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', // Mapped to PRD accent via CSS var
					foreground: 'hsl(var(--accent-foreground))'
				},
        accentSecondary: 'hsl(var(--secondary))', // Explicit name for PRD accentSecondary, uses same CSS var as 'secondary.DEFAULT'
        success: 'hsl(var(--secondary))', // Explicit name for PRD success, uses same CSS var as 'secondary.DEFAULT'
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))', // Mapped to PRD surface via CSS var
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
        appShell: {
          DEFAULT: 'hsl(var(--app-shell-background))' // For PRD's main background color #161C33
        }
			},
			borderRadius: {
        DEFAULT: 'var(--radius)', // Uses CSS var --radius (0.375rem from PRD 'rounded-md')
				lg: 'calc(var(--radius) + 0.125rem)', // Results in 0.5rem if --radius is 0.375rem
				md: 'var(--radius)', // Results in 0.375rem (PRD 'rounded-md')
				sm: 'calc(var(--radius) - 0.125rem)', // Results in 0.25rem if --radius is 0.375rem
        button: 'var(--radius)' // PRD buttons: 'rounded-md', uses CSS var --radius
			},
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
