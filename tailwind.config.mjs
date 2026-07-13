/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#64748b",
        line: "#d7dee8",
        panel: "#f7f9fc",
        brand: "#2563eb",
        accent: "#0f766e"
      }
    }
  },
  plugins: []
};
