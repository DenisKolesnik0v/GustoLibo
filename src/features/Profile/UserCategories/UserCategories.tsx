import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
    Button,
    Grid,
    Icon,
    Input,
    Modal,
    Checklist,
    ChecklistItem,
    useTheme,
} from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CategoryCard } from '@components/CategoryCard';
import {
    fetchCategories,
    createCategory,
    deleteCategory,
    addRecipe,
} from '@redux/actions/user-category';
import { useSelector } from '@redux/store';
import { IUserCategory } from '@redux/saga/user-category';

import cl from './UserCategories.module.scss';

export const UserCategories: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [modalAddCateg, setModalAddCateg] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryToDelete, setCategoryToDelete] = useState<IUserCategory | null>(null);
    const [modalAddRecipe, setModalAddRecipe] = useState(false);
    const [activeCategory, setActiveCategory] = useState<IUserCategory | null>(null);
    const [selectedRecipeIds, setSelectedRecipeIds] = useState<string[]>([]);

    const categories = useSelector((state) => state.userCategory.categories);
    const { userRecipes } = useSelector((state) => state.recipe);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleOpenAddCategory = () => setModalAddCateg(true);

    const handleCloseAddCategory = () => {
        setNewCategoryName('');
        setModalAddCateg(false);
    };

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            dispatch(createCategory(newCategoryName.trim()));
            handleCloseAddCategory();
        }
    };

    const handleDeleteCategory = () => {
        if (categoryToDelete) {
            dispatch(deleteCategory(categoryToDelete._id));
            setCategoryToDelete(null);
        }
    };

    const handleOpenAddRecipeModal = (category: IUserCategory) => {
        setActiveCategory(category);
        setSelectedRecipeIds([]);
        setModalAddRecipe(true);
    };

    const handleCloseAddRecipeModal = () => {
        setModalAddRecipe(false);
        setActiveCategory(null);
    };

    const handleChecklistChange = (selectedItems: ChecklistItem[]) => {
        const selectedIds = selectedItems.map((item) => item.id);
        setSelectedRecipeIds(selectedIds);
    };

    const handleAddRecipesToCategory = () => {
        if (activeCategory && selectedRecipeIds.length > 0) {
            selectedRecipeIds.forEach((recipeId) => {
                dispatch(addRecipe(activeCategory._id, recipeId));
            });
        }
        handleCloseAddRecipeModal();
    };

    return (
        <div className={classnames(cl['user-categories'])}>
            <Button
                text="Добавить новую категорию"
                icon={<Icon icon="add-list" />}
                onClick={handleOpenAddCategory}

                size="lg"
            />

            <Modal
                onClose={handleCloseAddCategory}
                isVisible={modalAddCateg}
                onBackgroundClick={handleCloseAddCategory}
                isClosable
                title={'Добавить новую категорию'}

            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e)}
                        placeholder="Название категории"

                    />
                    <Button
                        text="Создать"
                        onClick={handleAddCategory}

                    />
                </div>
            </Modal>

            <Modal
                onClose={() => setCategoryToDelete(null)}
                onBackgroundClick={() => setCategoryToDelete(null)}
                isVisible={!!categoryToDelete}
                title={`Удалить категорию "${categoryToDelete?.name}"?`}

            >
                <p>Это действие нельзя будет отменить</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Button
                        text="Отмена"
                        onClick={() => setCategoryToDelete(null)}

                    />
                    <Button
                        text="Удалить"
                        type="secondary"
                        onClick={handleDeleteCategory}

                    />
                </div>
            </Modal>

            <Modal
                onClose={handleCloseAddRecipeModal}
                onBackgroundClick={handleCloseAddRecipeModal}
                isVisible={modalAddRecipe}
                title={`Добавить рецепты в "${activeCategory?.name}"`}

            >
                <div className={classnames(cl['recipe-list'], cl[`recipe-list-theme-${theme}`])}>
                    <Checklist
                        items={userRecipes.map((recipe) => {
                            const recipeId = recipe._id || '';
                            return {
                                id: recipeId,
                                label: recipe.name,
                                checked: selectedRecipeIds.includes(recipeId),
                            };
                        })}
                        onChange={handleChecklistChange} theme={'light'}
                    />
                </div>
                <Button
                    text="Добавить"
                    onClick={handleAddRecipesToCategory}

                />
            </Modal>

            <Grid columns={{ md: 2, lg: 4, xl: 6 }}>
                {categories.map((item: IUserCategory, index: number) => (
                    <div
                        key={`${item.name}-${item.recipesCount}-${index}`}
                        className={classnames(cl['user-category'])}
                    >
                        <div className={cl['add-button']}>
                            <Icon
                                icon="add-list"
                                onClick={() => handleOpenAddRecipeModal(item)}
                            />
                        </div>
                        <div className={cl['delete-button']}>
                            <Icon
                                icon="trash"
                                onClick={() => setCategoryToDelete(item)}
                            />
                        </div>
                        <CategoryCard
                            imageUrl={item.img || 'img/pasta.jpg'}
                            title={item.name}
                            recipeCount={item.recipesCount}

                            onClick={() => navigate(`category/${item._id}`)}
                        />
                    </div>
                ))}
            </Grid>
        </div>
    );
};
