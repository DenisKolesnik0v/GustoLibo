import { ThemeContext } from 'orcalib-ui-kit';
import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const localTheme = localStorage.getItem('theme') as Theme | null;
    const [theme, setTheme] = useState<'light' | 'dark'>(localTheme || 'light');

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
