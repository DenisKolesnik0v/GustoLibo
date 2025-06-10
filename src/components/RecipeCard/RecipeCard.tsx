import React from 'react';
import { Button, Icon, Img, Spinner, Tooltip, useTheme } from 'orcalib-ui-kit';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { RecipeCardProps } from '@utils/models/recipes';

import cl from './RecipeCard.module.scss';

const renderInfo = (type: string, value: number, theme: string) => {
    return (
        <div className={classnames(cl['info-item'], cl[`info-item-theme-${theme}`])}>
            <span>{value}</span>
            <span>{type}</span>
        </div>
    );
};

const apiImg = '';

export const RecipeCard: React.FC<RecipeCardProps> = ({
    recipeId,
    title,
    description,
    img,
    cookingTime,
    calories,
    isVegan,
    isVegetarian,
    difficulty,
    loading = true,
    country,
    category,
    flagUrl,
}) => {
    const { theme } = useTheme();
    const onlyVeg = isVegan && isVegetarian;
    const navigate = useNavigate();
    const imgUrl = `${apiImg + img}`;

    if (!flagUrl) return <Spinner />;

    return (
        <div
            role='presentation'
            className={classnames(
                cl['recipe-card'],
                cl[`recipe-card__theme-${theme}`],
            )}
            onClick={() => navigate(`/recipe/${recipeId}`)}
        >
            <div className={cl['image-container']}>
                <Img
                    key={`user-recipe-${title}-${recipeId}`}
                    src={imgUrl || `img/eat-placeholder.svg`}
                    alt={`recipe of ${title}`}
                    className={classnames(cl.image)}
                    showLoader={loading}
                />
                <div className={classnames(cl['image-overlay'], cl[`image-overlay__theme-${theme}`])}>
                    {renderInfo('kcal', calories, theme)}
                    <div className={classnames(cl['def-circle'], cl[`def-circle-theme-${theme}`])}>
                        <Tooltip
                            content={
                                onlyVeg
                                    ? 'veg frendly'
                                    : (isVegan
                                        ? 'for vegan'
                                        : isVegetarian
                                            ? 'for vegetables'
                                            : 'not frendly for vegs'
                                    )
                            }
                            size="sm"

                        >
                            <Icon icon="check-circle-outline" size="sm" color="green" />
                        </Tooltip>
                    </div>
                    {renderInfo('min', cookingTime, theme)}
                    {renderInfo('dif', difficulty, theme)}
                </div>
            </div>

            <div className={classnames(cl.content, cl[`text__theme-${theme}`])}>
                <div className={cl.category}>
                    {category}
                </div>
                <div className={classnames(cl.title, cl[`text__theme-${theme}`])}>{title}</div>
                <div className={classnames(cl.country, cl[`text__theme-${theme}`])}>
                    <img
                        src={flagUrl || ''}
                        width={20}
                        height={12}
                    />
                    {country}
                </div>
                <div className={cl.description}>{description}</div>
            </div>

            <Button
                size="lg"
                text="Смотреть"
            />
        </div>
    );
};
