import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Icon, Modal } from 'orcalib-ui-kit';

import {
    fetchCategories,
    fetchRecipesByIdsRequest,
    removeRecipe,
} from '@redux/actions/user-category';
import { useSelector } from '@redux/store';
import { IRecipe } from '@utils/models/recipe';
import { IUserCategory } from '@redux/saga/user-category';
import { RecipeCard } from '@components/RecipeCard/RecipeCard';
import { Loader } from '@components/Loader';

import cl from './Category.module.scss';

export const Category: React.FC = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams<{ categoryId: string }>();
    const dispatch = useDispatch();
    const { categories, recipes, loadingRec } = useSelector((state) => state.userCategory);
    const { countries, loading: countriesLoading } = useSelector((state) => state.extras);
    const [category, setCategory] = useState<IUserCategory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categoryId) {
            const foundCategory = categories.find((cat: IUserCategory) => cat._id === categoryId);
            if (foundCategory) {
                setCategory(foundCategory);
                dispatch(fetchRecipesByIdsRequest(foundCategory.recipes));
            }
        }
    }, [categoryId, categories, dispatch]);

    if (loadingRec) return <div>Loading...</div>;

    const handleOpenModal = (recipeId: string) => {
        setSelectedRecipeId(recipeId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecipeId(null);
    };

    const handleDeleteRecipe = () => {
        if (selectedRecipeId) {
            dispatch(removeRecipe(categoryId || '', selectedRecipeId));
            handleCloseModal();
        }
    };

    if (countriesLoading) {
        return <Loader />;
    }

    return (
        <div className={cl.categoryPage}>
            <Button
                text="Назад к профилю"
                onClick={() => navigate('/profile')}

            />
            <Modal
                onClose={handleCloseModal}
                isVisible={isModalOpen}
                title={'Вы уверены что хотите убрать рецепт из категории?'}

                action={[
                    { text: 'Отмена', onClick: handleCloseModal },
                    { text: 'Удалить', onClick: handleDeleteRecipe, type: 'secondary' },
                ]}
            >
                Это действие нельзя будет отменить
            </Modal>
            {category && (
                <div className={cl.categoryHeader}>
                    <img src={category.img !== undefined ? category.img : '/img/pasta.jpg'} alt={category.name} className={cl.categoryImage} />
                    <div className={cl.categoryInfo}>
                        <h1 className={cl.categoryTitle}>{category.name}</h1>
                        <p className={cl.categoryRecipesCount}>{category.recipesCount} рецептов</p>
                    </div>
                </div>
            )}
            <Grid columns={{ md: 3, lg: 4, xl: 6 }}>
                {recipes.map((recipe: IRecipe, index: number) => {
                    const matchingCountries = countries.filter(
                        (item: { name: { en: string | null } }) =>
                            item.name.en === recipe.country,
                    );
                    const flagUrl = matchingCountries.length > 0
                        ? matchingCountries[0].flagUrl
                        : '';

                    return (
                        <div
                            key={`user-recipe-${recipe.name}-${recipe._id}-${index}`}
                            className={cl['user-recipe']}
                        >
                            <div className={cl['delete-button']}>
                                <Icon
                                    icon="trash"
                                    onClick={() => handleOpenModal(recipe._id || '')}
                                />
                            </div>
                            <RecipeCard
                                key={`recipe-${recipe._id}-${recipe.category}`}
                                recipeId={recipe._id || ''}
                                title={recipe.name}
                                description={recipe.descriptions[0].text}
                                img={recipe.imageUrl}
                                cookingTime={recipe.cookingTime}
                                calories={recipe.calories}
                                isVegan={recipe.isVegan}
                                isVegetarian={recipe.isVegetarian}
                                difficulty={recipe.difficulty}
                                country={recipe.country || ''}
                                category={recipe.category}
                                flagUrl={flagUrl}
                            />
                        </div>
                    );
                })}
            </Grid>
        </div>
    );
};
