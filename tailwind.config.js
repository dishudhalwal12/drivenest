/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pitch-black': 'var(--color-pitch-black)',
        'space-gray': 'var(--color-space-gray)',
        'cloud-white': 'var(--color-cloud-white)',
        'ghost-white': 'var(--color-ghost-white)',
        'cool-gray': 'var(--color-cool-gray)',
        'deep-graphite': 'var(--color-deep-graphite)',
        'storm-gray': 'var(--color-storm-gray)',
        'dark-charcoal': 'var(--color-dark-charcoal)',
        'highlight-blue': 'var(--color-highlight-blue)',
        'vivid-blue': 'var(--color-vivid-blue)',
        'interactive-blue': 'var(--color-interactive-blue)',
        'accent-teal': 'var(--color-accent-teal)',
        'neon-violet': 'var(--color-neon-violet)',
        'incandescent-orange': 'var(--color-incandescent-orange)',
        'muted-orange': 'var(--color-muted-orange)',
      },
      backgroundImage: {
        'gradient-sky-blue': 'var(--gradient-sky-blue)',
        'gradient-teal-lime': 'var(--gradient-teal-lime)',
        'gradient-ocean-spectrum': 'var(--gradient-ocean-spectrum)',
        'gradient-rainbow-burst': 'var(--gradient-rainbow-burst)',
      },
      borderRadius: {
        'cards': '28px',
        'inputs': '210px',
        'buttons': '999px',
        'standard': '10px',
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '1.5', letterSpacing: '-0.48px' }],
        'body-sm': ['14px', { lineHeight: '1.43', letterSpacing: '-0.31px' }],
        'body': ['17px', { lineHeight: '1.29', letterSpacing: '-0.32px' }],
        'subheading': ['20px', { lineHeight: '1.25', letterSpacing: '-0.2px' }],
        'heading-sm': ['24px', { lineHeight: '1.17', letterSpacing: '-0.14px' }],
        'heading': ['44px', { lineHeight: '1.05', letterSpacing: '-0.13px' }],
        'heading-lg': ['56px', { lineHeight: '1.07', letterSpacing: '-0.73px' }],
        'display': ['80px', { lineHeight: '1.05', letterSpacing: '-0.45px' }],
      },
    },
  },
  plugins: [],
};
