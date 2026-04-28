export function ThemeScript() {
  // Runs before React hydration to avoid a theme "flash".
  const code = `
(function() {
  try {
    var stored = localStorage.getItem('wb-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : null;
    if (!theme) {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

