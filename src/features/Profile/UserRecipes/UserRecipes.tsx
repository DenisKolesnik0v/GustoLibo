import { Button, ButtonGroupItemType, Grid, Icon, Modal } from 'orcalib-ui-kit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RecipeCard } from '@components/RecipeCard/RecipeCard';
import { deleteRecipeRequest, getUserRecipesRequest } from '@redux/actions/recipe';
import { fetchCountriesRequest } from '@redux/actions/extras';
import { useSelector } from '@redux/store';
import { Loader } from '@components/Loader';

import cl from './UserRecipes.module.scss';

export const UserRecipes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userRecipes } = useSelector((state) => state.recipe);
    const { countries, loading: countriesLoading } = useSelector((state) => state.extras);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getUserRecipesRequest());
        dispatch(fetchCountriesRequest());
    }, [dispatch]);

    const handleSubmit = () => {
        navigate('add-recipe');
    };

    const handleDeleteRecipe = () => {
        if (selectedRecipeId) {
            dispatch(deleteRecipeRequest(selectedRecipeId));
            setIsModalOpen(false);
        }
    };

    const handleOpenModal = (recipeId: string) => {
        setSelectedRecipeId(recipeId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecipeId(null);
    };

    const modalActions: ButtonGroupItemType[] = [
        {
            text: 'Отмена',
            onClick: handleCloseModal,
            type: 'secondary',
        },
        {
            text: 'Удалить',
            onClick: handleDeleteRecipe,
            type: 'primary',
        },
    ];

    if (countriesLoading) {
        return <Loader />;
    }

    return (
        <div className={cl['user-recipes']}>
            <Button
                text="Добавить новый рецепт"
                onClick={handleSubmit}
                icon={<Icon icon="add-list" />}
                size="lg"
            />

            <Modal
                onClose={handleCloseModal}
                isVisible={isModalOpen}
                title={'Вы уверены что хотите удалить рецепт?'}
                action={modalActions}
            >
                Это действие нельзя будет оменить
            </Modal>

            <Grid columns={{ md: 2, lg: 3, xl: 5 }}>
                {userRecipes.map((recipe) => {
                    const matchingCountries = countries.filter(
                        (item: { name: { en: string | null } }) =>
                            item.name.en === recipe.country,
                    );
                    const flagUrl = matchingCountries.length > 0
                        ? matchingCountries[0].flagUrl
                        : '';

                    return (
                        <div
                            key={`user-recipe-${recipe.name}-${recipe._id}`}
                            className={cl['user-recipe']}
                        >
                            <div className={cl['delete-button']}>
                                <Icon
                                    icon="trash"
                                    onClick={() => handleOpenModal(recipe._id || '')}
                                />
                            </div>
                            <RecipeCard
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
