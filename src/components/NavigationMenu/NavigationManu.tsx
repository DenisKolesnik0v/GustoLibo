import classnames from 'classnames';
import { Icon, IconName, useTheme } from 'orcalib-ui-kit';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import cl from './NavigationMenu.module.scss';

type MenuItem = {
    title: string;
    value: string;
    icon: IconName;
    path: string;
    isMobile?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
    { title: 'Главная', value: 'home', icon: 'home', path: '/' },
    { title: 'Категория', value: 'categories', icon: 'add-list', path: '/categories' },
    { title: 'Карта', value: 'map', icon: 'home', path: '/map' },
    { title: 'Профиль', value: 'profile', icon: 'user', path: '/profile', isMobile: true },
];

export const NavigationMenu = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => () => {
        localStorage.removeItem('countryToFind');
        navigate(path);
    };

    return (
        <React.Fragment>
            <div className={cl.desktop}>
                <nav className={classnames(cl['navigation-panel'], cl[`navigation-panel-theme-${theme}`])}>
                    {MENU_ITEMS.filter(item => !item.isMobile).map((item) => (
                        <div
                            role="button"
                            className={classnames(
                                cl['navigation-panel-element'],
                                cl[`navigation-panel-element-theme-${theme}`],
                            )}
                            onClick={handleNavigation(item.path)}
                            key={item.value}
                        >
                            <Icon icon={item.icon} size="sm" />
                            {item.title}
                        </div>
                    ))}
                </nav>
            </div>

            <div className={classnames(cl['mobile'], cl[`mobile-theme-${theme}`])}>
                <nav className={classnames(cl['navigation-mobile'], cl[`navigation-mobile-theme-${theme}`])}>
                    {MENU_ITEMS.map((item) => (
                        <Icon
                            onClick={handleNavigation(item.path)}
                            key={item.value}
                            icon={item.icon}
                            size="lg"
                        />
                    ))}
                </nav>
            </div>
        </React.Fragment>
    );
};
