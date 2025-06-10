import React, { useEffect, useState } from 'react';
import { Button, Input, useTheme } from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import { useSelector } from '@redux/store';
import { IRecipe } from '@utils/models/recipe';
import { allRecipes } from '@redux/actions/categories';
import { RecipesGrid } from '@components/RecipesGrid';
import { Loader } from '@components/Loader';

import cl from './Home.module.scss';

export const Home: React.FC = () => {
    const { recipes, loading } = useSelector((state) => state.category);
    const { theme } = useTheme();
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        maxCalories: undefined as number | undefined,
        maxTime: undefined as number | undefined,
        maxDifficulty: undefined as number | undefined,
        compoundIncludes: undefined as string | undefined,
        tagSearch: undefined as string | undefined,
        mealFilter: undefined as string | undefined,
        regionFilter: undefined as string | undefined,
        countryFilter: undefined as string | undefined,
    });

    const [draftFilters, setDraftFilters] = useState({ ...filters });
    const [showFilters, setShowFilters] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        dispatch(allRecipes());
    }, [dispatch]);

    const applyFilters = () => {
        setFilters({ ...draftFilters });
        setIsFiltered(true);
    };

    const resetFilters = () => {
        const defaultFilters = {
            maxCalories: undefined,
            maxTime: undefined,
            maxDifficulty: undefined,
            compoundIncludes: undefined,
            tagSearch: undefined,
            mealFilter: undefined,
            regionFilter: undefined,
            countryFilter: undefined,
        };
        setDraftFilters(defaultFilters);
        setFilters(defaultFilters);
        setIsFiltered(false);
    };

    const filteredRecipes = isFiltered
        ? recipes.filter((recipe: IRecipe) => {
            const {
                maxCalories,
                maxTime,
                maxDifficulty,
                compoundIncludes,
                tagSearch,
                mealFilter,
                regionFilter,
                countryFilter,
            } = filters;

            return (
                (maxCalories === undefined || recipe.calories <= maxCalories) &&
                (maxTime === undefined || recipe.cookingTime <= maxTime) &&
                (maxDifficulty === undefined || recipe.difficulty <= maxDifficulty) &&
                (compoundIncludes === undefined || recipe.compounds.some(c => c.name.toLowerCase().includes(compoundIncludes.toLowerCase()))) &&
                (tagSearch === undefined || recipe.tags.some(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()))) &&
                (mealFilter === undefined || recipe.meal === mealFilter) &&
                (regionFilter === undefined || recipe.region === regionFilter) &&
                (countryFilter === undefined || recipe.country === countryFilter)
            );
        })
        : recipes;

    if (loading || !recipes) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className={classnames(cl.title, cl[`title-theme-${theme}`])}>Рецепты</h1>

            <div className={classnames(cl.border__line)} />

            <Button
                text={showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                size="full"
                onClick={() => setShowFilters(!showFilters)}
                className={cl.filterOpenClose}
            />

            {showFilters && (
                <div className={classnames(cl.filterPanel, cl[`filterPanel-theme-${theme}`])}>
                    <label className={cl.filterLabel}>
                        Калории до:
                        <Input
                            type="range"
                            min={0}
                            max={2000}
                            value={draftFilters.maxCalories ?? 0}
                            onChange={(e) => setDraftFilters({ ...draftFilters, maxCalories: +e })}
                        />
                        <Input
                            label={'Кол-во каллорий'}
                            type="number"
                            min={0}
                            max={2000}
                            value={draftFilters.maxCalories ?? ''}
                            onChange={(e) => setDraftFilters({ ...draftFilters, maxCalories: +e })}
                        />
                    </label>

                    <label className={cl.filterLabel}>
                        Время (мин):
                        <Input
                            type="number"
                            value={draftFilters.maxTime ?? ''}
                            onChange={(e) => setDraftFilters({ ...draftFilters, maxTime: +e })}
                        />
                    </label>

                    <label className={cl.filterLabel}>
                        <Input
                            label="Сложность до:"
                            type="range"
                            min={1}
                            max={10}
                            value={draftFilters.maxDifficulty ?? 1}
                            onChange={(e) => setDraftFilters({ ...draftFilters, maxDifficulty: +e })}
                        />
                        <Input
                            type="number"
                            min={1}
                            max={10}
                            value={draftFilters.maxDifficulty ?? ''}
                            onChange={(e) => setDraftFilters({ ...draftFilters, maxDifficulty: +e })}
                        />
                    </label>

                    <label className={cl.filterLabel}>
                        <Input
                            label='Ингредиент:'
                            type="text"
                            value={draftFilters.compoundIncludes ?? ''}
                            onChange={(e) => setDraftFilters({ ...draftFilters, compoundIncludes: e })}
                            placeholder="Введите ингредиент"
                        />
                    </label>

                    <label className={cl.filterLabel}>
                        <Input
                            label="Тег:"
                            type="text"
                            value={draftFilters.tagSearch ?? ''}
                            onChange={(e) => setDraftFilters({ ...draftFilters, tagSearch: e })}
                            placeholder="Введите тег"
                        />
                    </label>

                    <label className={cl.filterLabel}>
                        <Input
                            label="Регион:"
                            type="text"
                            value={draftFilters.regionFilter ?? ''}
                            onChange={(e) => setDraftFilters({ ...draftFilters, regionFilter: e })}
                            placeholder="Введите регион"
                        />
                    </label>

                    <label className={cl.filterLabel}>
                        <Input
                            label="Страна"
                            type="text"
                            value={draftFilters.countryFilter ?? ''}
                            onChange={(e) => setDraftFilters({ ...draftFilters, countryFilter: e })}
                            placeholder="Введите страну"
                        />
                    </label>

                    <div className={cl.filterButtons}>
                        <Button
                            text="Принять"
                            onClick={applyFilters}
                        />
                        <Button
                            text="Сбросить"
                            onClick={resetFilters}
                        />
                    </div>
                </div>
            )}

            <div className={classnames(cl.border__line)} />

            <RecipesGrid
                recipes={filteredRecipes}
            />
        </div>
    );
};
