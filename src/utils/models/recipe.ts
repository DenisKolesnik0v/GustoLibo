export interface IDescription {
    language: string;
    text: string;
}

export type MetricUnit = 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'pcs';

export interface ICompound {
    name: string;
    amount: number;
    unit: MetricUnit;
}

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IRecipe {
    _id?: string;
    name: string;
    descriptions: IDescription[];
    imageUrl: string | File;
    cookingTime: number;
    calories: number;
    isVegan: boolean;
    isVegetarian: boolean;
    difficulty: DifficultyLevel;
    compounds: ICompound[];
    tags: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    category: string;
    country: string | null;
    region: string | null;
    author?: string;
    authorCity?: string;
    meal?: string;
    cooking?: string[];
}
