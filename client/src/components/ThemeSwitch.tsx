import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none"
      style={{
        background: theme === 'dark' ? '#222' : '#eee',
        boxShadow: theme === 'dark'
          ? '0 2px 8px rgba(0,0,0,0.2)'
          : '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <span
        className="absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-300"
        style={{
          background: theme === 'dark' ? '#fff' : '#222',
          left: theme === 'dark' ? '1px' : 'calc(100% - 25px)'
        }}
      />
      <span className="absolute left-3 top-2 text-lg transition-opacity duration-300"
        style={{ opacity: theme === 'dark' ? 1 : 0, color: '#fff' }}>
        &#x1F319;
      </span>
      <span className="absolute right-3 top-2 text-lg transition-opacity duration-300"
        style={{ opacity: theme === 'light' ? 1 : 0, color: '#222' }}>
        &#x2600;
      </span>
    </button>
  );
};

export default ThemeSwitch; 