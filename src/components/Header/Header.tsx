import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import { Button, Icon, Search, useTheme } from 'orcalib-ui-kit';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { useSelector } from '@redux/store';
import { HeaderProps } from '@utils/models/header';
import { searchRecipesRequest } from '@redux/actions/categories';
import { Portal } from '@components/Portal';
import ThemeSwitcher from '@components/ThemeSwitcher';

import { Authorization } from '../../pages/Authorization';
import { RecipesGrid } from '../../components/RecipesGrid';
import styles from './Header.module.scss';
import { MobileSearch } from '../../features/Search';

const MemoizedSearch = memo(Search);
const MemoizedButton = memo(Button);

export const Header: React.FC<HeaderProps> = memo(({ siteName }) => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const { isAuth } = useSelector((state) => state.auth);
    const { searchResults } = useSelector((state) => state.category);
    const { fastQuery } = useSelector((state) => state.extras);

    const [searchValue, setSearchValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            overlayRef.current &&
            !overlayRef.current.querySelector(`.${styles['header__search-overlay-content']}`)?.contains(event.target as Node)
        ) {
            setIsSearchOverlayOpen(false);
        }
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsSearchOverlayOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isSearchOverlayOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSearchOverlayOpen, handleClickOutside, handleKeyDown]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue]);

    useEffect(() => {
        if (debouncedValue !== '') {
            dispatch(searchRecipesRequest(debouncedValue));
            setIsSearchOverlayOpen(true);
        }
    }, [debouncedValue, dispatch]);

    useEffect(() => {
        if (fastQuery && fastQuery !== '') {
            dispatch(searchRecipesRequest(fastQuery));
            setSearchValue(fastQuery);
            setIsSearchOverlayOpen(true);
        }
    }, [fastQuery, dispatch]);

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const handleSearchSubmit = useCallback(
        (query: string) => {
            dispatch(searchRecipesRequest(query));
            setIsSearchOverlayOpen(true);
        },
        [dispatch],
    );

    const handleNavigateProfile = () => {
        navigate('profile');
    };

    const handleCloseOverlay = () => {
        setIsSearchOverlayOpen(false);
        setSearchValue('');
    };

    return (
        <React.Fragment>
            <header className={styles.header}>
                <div
                    role="presentation"
                    onClick={() => navigate('/')}
                    className={styles.header__title}
                >
                    {siteName}
                </div>
                <MemoizedSearch
                    value={searchValue}
                    onChange={handleSearchChange}
                    onSearch={handleSearchSubmit}
                />
                <div className={styles.header__mobileSearch}>
                    <MobileSearch
                        value={searchValue}
                        onChange={handleSearchChange}
                        onSearch={handleSearchSubmit}
                    />
                </div>
                <Authorization opened={opened} setClose={() => setOpened(false)} />
                <div className={styles.header__actions}>
                    {isAuth
                        ? (
                            <div className={styles['header__actions-profile']}>
                                <ThemeSwitcher />
                                <div
                                    className={classNames(
                                        styles.header__user,
                                        styles[`header__user--theme-${theme}`],
                                    )}
                                    onClick={handleNavigateProfile}
                                >
                                    <div className={styles['header__user-icon']}>
                                        <Icon icon="user" size="lg" />
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <MemoizedButton
                                text="Войти"
                                size="sm"
                                onClick={() => setOpened(true)}
                            />
                        )}
                </div>
            </header>

            {isSearchOverlayOpen && (searchValue || fastQuery) && (
                <Portal>
                    <div
                        className={classNames(
                            styles['header__search-overlay'],
                            styles[`header__search-overlay--theme-${theme}`],
                        )}
                        ref={overlayRef}
                    >
                        <div
                            className={classNames(
                                styles['header__search-overlay-content'],
                                styles[`header__search-overlay-content__theme-${theme}`],
                            )}
                        >
                            <MemoizedButton
                                text="Закрыть"
                                onClick={handleCloseOverlay}
                                size="sm"
                            />
                            <RecipesGrid recipes={searchResults} />
                        </div>
                    </div>
                </Portal>
            )}
        </React.Fragment>
    );
});

Header.displayName = 'Header';
