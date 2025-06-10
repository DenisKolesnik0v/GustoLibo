import React, { useState } from 'react';
import classnames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';

import cl from './CategoryCard.module.scss';

interface CategoryCardProps {
    imageUrl: string;
    title: string;
    recipeCount: number;
    theme?: 'light' | 'dark';
    size?: 'sm' | 'lg';
    onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
    imageUrl,
    title,
    recipeCount,
    onClick,
    size = 'sm',
}) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    const handleImageError = () => {
        setImgError(true);
    };

    return (
        <div
            className={classnames(
                cl['category-card'],
                cl[`category-card-theme-${theme}`],
                cl[`category-card-size-${size}`],
                { [cl.hovered]: isHovered },
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className={cl['image-container']}>
                <img
                    className={cl.image}
                    src={imgError ? '/img/img-placeholder.svg' : imageUrl}
                    alt={title}
                    onError={handleImageError}
                />
                <div className={cl.overlay} />
            </div>

            <div className={classnames(cl['content'], cl['text-wrapper'])}>
                <h3 className={classnames(cl.title, cl[`title-theme-${theme}`])}>
                    {title}
                </h3>
                <div className={cl.recipeCount}>
                    {recipeCount} {recipeCount === 1 ? 'рецепт' : recipeCount < 5 ? 'рецепта' : 'рецептов'}
                </div>
            </div>
        </div>
    );
};
