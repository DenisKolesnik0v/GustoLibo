import React from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import classnames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';

import cl from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    if (!toggleTheme) return;

    const handleToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme();
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div
            className={classnames(cl['theme-switcher'], cl[theme])}
            onClick={handleToggle}
            role="switch"
            aria-checked={theme === 'dark'}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleToggle();
                }
            }}
        >
            <div className={cl['switch-slider']}>
                {theme === 'light' ? <BsSun size={20} /> : <BsMoon size={20} />}
            </div>
        </div>
    );
};
