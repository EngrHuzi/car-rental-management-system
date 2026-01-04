'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Always use light theme
    const root = document.documentElement;
    root.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);

  const toggleTheme = () => {
    // No-op: theme is always light
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // During SSR or before mounting, return default values
  if (context === undefined) {
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
    };
  }
  return context;
}
