import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tabs, useTheme } from 'orcalib-ui-kit';
import classnames from 'classnames';

import { fetchRecipeById } from '@redux/actions/categories';
import { useSelector } from '@redux/store';
import { Loader } from '@components/Loader';

import { RecipeCrumbs } from './RecipeCrumbs';
import cl from './Recipe.module.scss';
import { RecipeDesc } from './RecipeDesc/RecipeDesc';
import { RecipeCook } from './RecipeCook';
import { RecipeCompounds } from './RecipeCompounds';

const baseUrl = '/api';

export const Recipe: React.FC = () => {
    const { theme } = useTheme();
    const { recipe, loadingRecipeById } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const { recipeId } = useParams();

    useEffect(() => {
        dispatch(fetchRecipeById(recipeId || ''));
    }, [dispatch]);

    if (loadingRecipeById || !recipe) {
        return <Loader />;
    }

    return (
        <div className={classnames(cl['recipe'], cl[`recipe-theme-${theme}`])}>
            <header className={cl['recipe__header']}>
                <RecipeCrumbs recipeName={recipe.name} />
            </header>
            <main className={cl['recipe__main']}>
                <div className={cl['recipe__img-container']}>
                    <img src={recipe.imageUrl
                        ? (
                            `${baseUrl}${recipe.imageUrl}`
                        )
                        : '/img/eat-placeholder.svg'
                    } className={cl['recipe__img']} />
                </div>
                <RecipeDesc recipe={recipe} />
            </main>
            <section>
                <Tabs
                    tabs={[
                        { id: '1', label: 'Рецепт', content: <RecipeCook cooking={recipe.cooking} /> },
                        { id: '2', label: 'Ингредиенты', content: <RecipeCompounds compounds={recipe.compounds} /> },
                    ]}

                />
            </section>
        </div>
    );
};
