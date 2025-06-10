import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Select, Button, Checklist, ChecklistItem } from 'orcalib-ui-kit';
import { useNavigate } from 'react-router-dom';

// import { createRecipeRequest } from '@redux/actions/recipe';
import { DifficultyLevel, ICompound, IDescription, IRecipe, MetricUnit } from '@utils/models/recipe';
import { useSelector } from '@redux/store';
import { fetchCountriesRequest, ICountry } from '@redux/actions/extras';
import { fetchAllCategoriesRequest, ICategory } from '@redux/actions/categories';

import { ImageUploader } from '../../../features/ImageUploader';
import cl from './AddRecipe.module.scss';

const AddRecipe: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState<Omit<IRecipe, '_id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        descriptions: [{ language: 'ru', text: '' }],
        imageUrl: '',
        cookingTime: 0,
        calories: 0,
        isVegan: false,
        isVegetarian: false,
        difficulty: 1,
        compounds: [],
        tags: [],
        isActive: true,
        category: '',
        country: null,
        region: null,
        author: '',
        authorCity: '',
        meal: '',
        cooking: [],
    });
    const { countries } = useSelector((state) => state.extras);
    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchAllCategoriesRequest());
    }, [dispatch]);

    const difficultyOptions = Array.from({ length: 10 }, (_, i) => ({
        value: (i + 1).toString(),
        label: `${i + 1} - ${i + 1 === 1 ? 'Очень легко' : i + 1 === 10 ? 'Очень сложно' : 'Средне'}`,
    }));

    const unitOptions: { value: MetricUnit; label: string }[] = [
        { value: 'g', label: 'гр' },
        { value: 'kg', label: 'кг' },
        { value: 'ml', label: 'мл' },
        { value: 'l', label: 'л' },
        { value: 'tsp', label: 'ч.л.' },
        { value: 'tbsp', label: 'ст.л.' },
        { value: 'cup', label: 'чашка' },
        { value: 'pcs', label: 'шт' },
    ];

    const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([
        { value: '', label: 'Не указана' },
    ]);

    const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        dispatch(fetchCountriesRequest());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            const options = categories.map((category: ICategory) => ({
                value: category.name,
                label: category.name,
            }));
            setCategoryOptions(options);
        }
    }, [categories]);

    useEffect(() => {
        if (countries.length > 0) {
            const options = countries
                .map((country: ICountry) => ({
                    value: country.name.en,
                    label: country.name.ru,
                }))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .sort((a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label));
            setCountryOptions([{ value: '', label: 'Не указана' }, ...options]);
        }
    }, [countries]);

    const [dietChecklist, setDietChecklist] = useState<ChecklistItem[]>([
        {
            id: 'isVegetarian',
            label: 'Вегетарианский',
            checked: false,
        },
        {
            id: 'isVegan',
            label: 'Веганский',
            checked: false,
        },
    ]);

    const handleInputChange = (field: keyof IRecipe, value: string | number | boolean | IDescription[] | string[] | { name: string; amount: number; unit: string; }[] | null) => {
        setRecipe(prev => ({ ...prev, [field]: value }));
    };

    const handleDescriptionChange = (index: number, field: keyof IDescription, value: string) => {
        const newDescriptions = [...recipe.descriptions];
        newDescriptions[index] = { ...newDescriptions[index], [field]: value };
        handleInputChange('descriptions', newDescriptions);
    };

    const handleCompoundChange = (index: number, field: keyof ICompound, value: string | number | MetricUnit) => {
        const newCompounds = [...recipe.compounds];
        newCompounds[index] = { ...newCompounds[index], [field]: value };
        handleInputChange('compounds', newCompounds);
    };

    const handleTagChange = (value: string) => {
        handleInputChange('tags', value);
    };

    const handleDietChange = (updatedItems: ChecklistItem[]) => {
        setDietChecklist(updatedItems);
        setRecipe((prev) => ({
            ...prev,
            isVegetarian: updatedItems.find((item) => item.id === 'isVegetarian')?.checked || false,
            isVegan: updatedItems.find((item) => item.id === 'isVegan')?.checked || false,
        }));
    };

    const addDescription = () => {
        handleInputChange('descriptions', [...recipe.descriptions, { language: 'en', text: '' }]);
    };

    const addCompound = () => {
        handleInputChange('compounds', [...recipe.compounds, { name: '', amount: 0, unit: 'g' }]);
    };

    const removeDescription = (index: number) => {
        if (recipe.descriptions.length > 1) {
            const newDescriptions = recipe.descriptions.filter((_, i) => i !== index);
            handleInputChange('descriptions', newDescriptions);
        }
    };

    const removeCompound = (index: number) => {
        const newCompounds = recipe.compounds.filter((_, i) => i !== index);
        handleInputChange('compounds', newCompounds);
    };

    /*
    const handleSubmit = () => {
        const recipeToSubmit: IRecipe = {
            ...recipe,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        dispatch(createRecipeRequest(recipeToSubmit));
        navigate('/profile');
    }; */

    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('name', recipe.name);
        formData.append('cookingTime', recipe.cookingTime.toString());
        formData.append('calories', recipe.calories.toString());
        formData.append('difficulty', recipe.difficulty.toString());
        formData.append('isVegan', recipe.isVegan.toString());
        formData.append('isVegetarian', recipe.isVegetarian.toString());
        formData.append('isActive', recipe.isActive.toString());
        formData.append('category', recipe.category);
        formData.append('author', '');
        formData.append('authorCity', '');
        formData.append('meal', recipe.meal || '');

        if (recipe.country) formData.append('country', recipe.country);
        if (recipe.region) formData.append('region', recipe.region);

        formData.append('descriptions', JSON.stringify(recipe.descriptions));
        formData.append('compounds', JSON.stringify(recipe.compounds));
        formData.append('tags', JSON.stringify(recipe.tags));
        formData.append('cooking', JSON.stringify(recipe.cooking));

        if (recipe.imageUrl instanceof File) {
            formData.append('image', recipe.imageUrl);
        }

        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('/api/profile/create-recipe', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) throw new Error('Ошибка при отправке рецепта');

            const data = await res.json();
            console.log('Рецепт создан:', data);
            navigate('/profile');
        } catch (err) {
            console.error(err);
            alert('Не удалось создать рецепт');
        }
    };

    return (
        <div className={cl.addRecipePage}>
            <h1>Добавить новый рецепт</h1>
            <Button
                text="Назад к профилю"
                onClick={() => navigate('/profile')}
                className={cl['goback']}

            />
            <div className={cl.section}>
                <h2>Основная информация</h2>
                <ImageUploader onSelect={(file) => setRecipe((prev) => ({ ...prev, imageUrl: file }))} />
                <Input
                    label="Название рецепта*"
                    placeholder="Введите название"
                    value={recipe.name}
                    onChange={handleInputChange.bind(null, 'name')}

                    size="large"
                />
                <div className={cl.row}>
                    <Input
                        label="Время приготовления (мин)*"
                        type="number"
                        value={recipe.cookingTime.toString()}
                        onChange={(value) => handleInputChange('cookingTime', parseInt(value) || 0)}

                        size="large"
                    />
                    <Input
                        label="Калории*"
                        type="number"
                        value={recipe.calories.toString()}
                        onChange={(value) => handleInputChange('calories', parseInt(value) || 0)}

                        size="large"
                    />
                </div>
                <div className={cl.row}>
                    <Select
                        options={difficultyOptions}
                        value={recipe.difficulty.toString()}
                        onChange={(value) => handleInputChange('difficulty', parseInt(value) as DifficultyLevel)}
                        size="lg"
                        placeholder="Сложность*"
                    />
                    <Select
                        options={countryOptions}
                        value={recipe.country || ''}
                        onChange={(value) => handleInputChange('country', value || null)}
                        size="lg"
                        placeholder="Страна происхождения"
                    />
                    <Select
                        options={categoryOptions}
                        value={recipe.category}
                        onChange={handleInputChange.bind(null, 'category')}
                        size="sm"
                        placeholder="Выберите категорию"
                    />
                </div>
                <Input
                    label="Теги (через запятую)"
                    placeholder="вегетарианский, быстро, сыр"
                    value={recipe.tags}
                    onChange={handleTagChange}

                    size="large"
                />
                <Checklist
                    items={dietChecklist}
                    onChange={handleDietChange}
                    className={cl.dietChecklist}
                    theme='light'
                />
            </div>
            <div className={cl.section}>
                <h2>Описание</h2>
                {recipe.descriptions.map((desc, index) => (
                    <div key={index} className={cl.descriptionItem}>
                        <Select
                            options={[
                                { value: 'en', label: 'English' },
                                { value: 'ru', label: 'Русский' },
                            ]}
                            value={desc.language}
                            onChange={(value) => handleDescriptionChange(index, 'language', value)}
                            size="lg"
                            placeholder="Язык описания"
                        />
                        <Input
                            placeholder="Текст описания"
                            value={desc.text}
                            onChange={(value) => handleDescriptionChange(index, 'text', value)}
                            size="large"
                        />
                        {recipe.descriptions.length > 1 && (
                            <Button
                                onClick={() => removeDescription(index)}
                                type="secondary"
                                size="sm"
                                text="Удалить описание"
                            />
                        )}
                    </div>
                ))}
                <Button
                    onClick={addDescription}
                    type="secondary"
                    text="Добавить описание на другом языке"
                />
            </div>
            <div className={cl.section}>
                <h2>Ингредиенты</h2>
                {recipe.compounds.map((compound, index) => (
                    <div key={index} className={cl.compoundItem}>
                        <div className={cl.compoundRow}>
                            <Input
                                placeholder="Название ингредиента"
                                value={compound.name}
                                onChange={(value) => handleCompoundChange(index, 'name', value)}
                                size="large"
                            />
                            <Input
                                placeholder="Количество"
                                type="number"
                                value={compound.amount.toString()}
                                onChange={(value) => handleCompoundChange(index, 'amount', parseFloat(value) || 0)}
                                size="large"
                            />
                            <Select
                                options={unitOptions}
                                value={compound.unit}
                                onChange={(value) => handleCompoundChange(index, 'unit', value as MetricUnit)}
                                size="sm"
                            />
                        </div>
                        <Button
                            onClick={() => removeCompound(index)}
                            type="ghost"
                            size="sm"
                            text="Удалить"
                        />
                    </div>
                ))}
                <Button
                    onClick={addCompound}
                    type="secondary"
                    text="Добавить ингредиент"
                />
            </div>
            <div className={cl.section}>
                <h2>Шаги приготовления</h2>
                {recipe.cooking && recipe.cooking.map((step, index) => (
                    <div key={index} className={cl.descriptionItem}>
                        <Input
                            placeholder={`Шаг ${index + 1}`}
                            value={step}
                            onChange={(value) => {
                                if (!recipe.cooking) return;
                                const newSteps = [...recipe.cooking];
                                newSteps[index] = value;
                                handleInputChange('cooking', newSteps);
                            }}
                            size="large"
                        />
                        <Button
                            onClick={() => {
                                const newSteps = recipe.cooking && recipe.cooking.filter((_, i) => i !== index);
                                handleInputChange('cooking', newSteps || '');
                            }}
                            text="Удалить шаг"
                            type="ghost"
                            size="sm"

                        />
                    </div>
                ))}
                <Button
                    onClick={() => handleInputChange('cooking', [...(recipe?.cooking || []), ''])}
                    text="Добавить шаг"
                    type="secondary"
                />
            </div>

            <div className={cl.actions}>
                <Button
                    onClick={handleSubmit}
                    type="primary"
                    size="xl"
                    text="Сохранить рецепт"
                />
            </div>
        </div>
    );
};

export default AddRecipe;
