import React from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Taglist, useTheme } from 'orcalib-ui-kit';

import { IRecipe } from '@utils/models/recipe';

import cl from './RecipeDesc.module.scss';
import { RecipeDescription } from '../RecipeDesciption';

interface RecipeProp {
    recipe: IRecipe;
}

export const RecipeDesc: React.FC<RecipeProp> = ({ recipe }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handelNavigateToMap = () => {
        localStorage.setItem('countryToFind', recipe.country || '');
        navigate('/map');
    };

    const handleNavigateToCategory = () => {
        navigate(`/categories/${recipe.category}`);
    };

    console.log(recipe.tags);

    return (
        <section className={classnames(cl['wrapper'], cl[`wrapper__theme-${theme}`])} aria-label="Recipe description">
            <div className={cl.descript}>
                <RecipeDescription description={recipe.descriptions[0].text} />
            </div>

            <div className={cl.border} />
            <div className={cl.content}>
                <ul className={cl['content__list']}>
                    <li className={cl.item}>
                        <span>Category: </span>
                        <div
                            onClick={handleNavigateToCategory}
                            title={`Go to category ${recipe.category}`}
                            className={cl['navigate']}
                        >
                            {recipe.category}
                        </div>
                    </li>
                    <li className={cl.item}>
                        <span>Difficulty: </span>
                        <b>{recipe.difficulty}</b>
                    </li>
                    <li className={cl.item}>
                        <span>Time to cook: </span><b>{recipe.cookingTime}</b>
                    </li>
                    <li className={cl.item}>
                        <span>{recipe.country === 'Russia' || recipe.country === 'Россия' ? 'Motherland: ' : 'Country: '}</span>
                        <div
                            onClick={handelNavigateToMap}
                            title={`Go to recipes of the country ${recipe.country}`}
                            className={cl['navigate']}
                        >
                            {recipe.country}
                        </div>
                    </li>
                    <li className={cl.item}>
                        Теги:
                        <Taglist
                            tags={recipe.tags[0].split(',')}
                            rotate='horizontal'
                            onRemove={() => {}}
                        />
                    </li>
                </ul>
            </div>
        </section>
    );
};
