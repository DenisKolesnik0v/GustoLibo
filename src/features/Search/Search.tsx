import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon, useTheme } from 'orcalib-ui-kit';

import cl from './Search.module.scss';

export interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: (query: string) => void;
    placeholder?: string;
}

export const MobileSearch: React.FC<SearchProps> = ({
    placeholder = 'Введите рецепт или ингредиент...',
    value,
    onChange,
    onSearch,
}) => {
    const { theme } = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFocus = () => {
        setIsExpanded(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsExpanded(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(value);
        }
    };

    const handleSearchClick = () => {
        setIsExpanded(true);
        inputRef.current?.focus();
    };

    const handleClear = () => {
        onChange('');
        if (onSearch) {
            onSearch('');
        }
        if (!value) {
            setIsExpanded(false);
        }
    };

    return (
        <div className={classNames(cl['search-wrapper'], cl[`search-wrapper-theme-${theme}`])}>
            <div
                className={classNames(
                    cl['search-circle'],
                    isExpanded && cl['search-circle-expanded'],
                    isExpanded && cl[`search-circle-expanded-theme-${theme}`],
                )}
                onClick={handleSearchClick}
                role="button"
                tabIndex={0}
                aria-label="Открыть поиск"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={classNames(
                        cl['search-input'],
                        cl[`search-input-theme-${theme}`],
                        !isExpanded && cl['search-input-collapsed'],
                    )}
                    aria-label="Поиска рецептов"
                />

                {value && (
                    <div
                        className={cl['clear-icon']}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                        }}
                    >
                        <Icon icon="close" color={theme === 'dark' ? 'white' : 'black'} size="sm" />
                    </div>
                )}

                {onSearch && value && (
                    <div
                        className={cl['search-submit']}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSearchClick();
                        }}
                    >
                        <Icon icon="search" color={theme === 'dark' ? 'white' : 'black'} />
                    </div>
                )}
            </div>
        </div>
    );
};
