export const prefersDarkMode = () => (
  window.matchMedia('(prefers-color-scheme: dark)').matches
);
