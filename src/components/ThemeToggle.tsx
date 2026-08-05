import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('odalx-theme', dark ? 'dark' : 'light');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#05060f' : '#f8fafc');
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Cambiar a tema claro · Switch to light theme' : 'Cambiar a tema oscuro · Switch to dark theme'}
      className="btn-ghost h-9 w-9 rounded-full !border-transparent bg-transparent p-0 text-lg"
    >
      {dark ? '☀' : '🌙'}
    </button>
  );
}
