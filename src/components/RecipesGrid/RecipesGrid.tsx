import { Grid } from 'orcalib-ui-kit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Loader } from '@components/Loader';
import { RecipeCard } from '@components/RecipeCard/RecipeCard';
import { fetchCountriesRequest } from '@redux/actions/extras';
import { IRecipe } from '@utils/models/recipe';

import { useSelector } from '../../redux/store';
import cl from './RecipesGrid.module.scss';

interface RecipesGridProps {
    recipes: IRecipe[] | [],
}

export const RecipesGrid: React.FC<RecipesGridProps> = ({
    recipes,
}) => {
    const dispatch = useDispatch();
    const { countries, loading } = useSelector((state) => state.extras);

    useEffect(() => {
        dispatch(fetchCountriesRequest());
    }, [dispatch]);

    if (!recipes) {
        return <Loader />;
    }

    if (recipes.length === 0) {
        return <div>Recipes not found...</div>;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <Grid columns={{ md: 3, lg: 4, xl: 5 }}>
                {recipes.map((recipe: IRecipe) => {
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
