export type Recipe = {
    title: string,
    description: string,

}

export type RecipeCardProps = {
    recipeId?: string;
    title: string;
    description: string;
    img: string | File;
    cookingTime: number;
    calories: number;
    isVegan: boolean;
    isVegetarian: boolean;
    difficulty: number;
    loading?: boolean;
    country?: string;
    category?: string;
    flagUrl?: string;
};
