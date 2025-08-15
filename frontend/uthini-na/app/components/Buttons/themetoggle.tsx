'use client';

import { useTheme } from '../ThemeProvider';


export default function Themetoggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className=" theme-toggle ">
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}