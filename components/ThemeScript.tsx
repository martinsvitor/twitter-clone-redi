import Script from 'next/script';

export default function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const theme = localStorage.getItem('theme-preference');
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const effectiveTheme = theme === 'system' ? systemTheme : (theme || systemTheme);
            document.documentElement.classList.add(effectiveTheme);
          })();
        `,
      }}
    />
  );
}
