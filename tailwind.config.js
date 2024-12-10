const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    safelist: ["dark"],
    prefix: "",

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            boxShadow: {
                "ds-card": "0 0 0 1px hsla(0, 0%, 100%, .145)"
            },
            colors: {
                "ds-gray": {
                    "alpha-100": "#ffffff0f",
                    "alpha-200": "#ffffff17",
                    "alpha-300": "#ffffff21",
                    "alpha-400": "#ffffff24",
                    "alpha-500": "#ffffff3d",
                    "alpha-600": "#ffffff82",
                    "alpha-700": "#ffffff8a",
                    "alpha-800": "#ffffff78",
                    "alpha-900": "#ffffff9c",
                    "alpha-1000": "#ffffffeb",
                    "100": "hsl(0, 0%, 10%)",
                    "200": "hsl(0, 0%, 12%)",
                    "300": "hsl(0, 0%, 16%)",
                    "400": "hsl(0, 0%, 18%)",
                    "500": "hsl(0, 0%, 27%)",
                    "600": "hsl(0, 0%, 53%)",
                    "700": "hsl(0, 0%, 56%)",
                    "800": "hsl(0, 0%, 49%)",
                    "900": "hsl(0, 0%, 63%)",
                    "1000": "hsl(0, 0%, 93%)",
                },
                epa: "#8d1d2c",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "collapsible-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-collapsible-content-height)" },
                },
                "collapsible-up": {
                    from: { height: "var(--radix-collapsible-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "collapsible-down": "collapsible-down 0.2s ease-in-out",
                "collapsible-up": "collapsible-up 0.2s ease-in-out",
            },
        },
    },
    plugins: [animate],
};
