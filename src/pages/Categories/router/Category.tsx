import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';

import { fetchAllCategoriesRequest, fetchRecipesByCategory, ICategory } from '@redux/actions/categories';
import { useSelector } from '@redux/store';
import { RecipesGrid } from '@components/RecipesGrid';
import { Loader } from '@components/Loader';

import styles from './Category.module.scss';

export const Category: React.FC = () => {
    const { theme } = useTheme();
    const { categoryRecipes, categories, loading } = useSelector((state) => state.category);
    const [hasImageError, setHasImageError] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const dispatch = useDispatch();
    const { category } = useParams();
    const currentCategory: ICategory | undefined = useMemo(() => {
        return category ? categories.find((item: ICategory) => item.name === category) : undefined;
    }, [categories, category]);

    useEffect(() => {
        dispatch(fetchAllCategoriesRequest());
    }, [dispatch]);

    useEffect(() => {
        if (category) {
            dispatch(fetchRecipesByCategory(category));
        }
    }, [dispatch, category]);

    const handleImageError = () => {
        setHasImageError(true);
        setIsImageLoaded(true);
    };

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    if (loading || !currentCategory) {
        return <Loader />;
    }

    return (
        <article className={classNames(styles.category, styles[`category--${theme}`])}>
            <header className={styles.category__header}>
                <figure className={styles.category__figure}>
                    {!isImageLoaded && !hasImageError && <div className={styles.category__imageSkeleton} />}
                    <img
                        src={
                            hasImageError
                                ? '/img/eat-placeholder.svg'
                                : `/api/img/categories/${category?.toLowerCase()}.svg`
                        }
                        alt={
                            hasImageError
                                ? `Запасное изображение для категории ${currentCategory.name}`
                                : `Изображение категории ${currentCategory.name}`
                        }
                        className={classNames(styles.category__image, {
                            [styles['category__image--hidden']]: !isImageLoaded && !hasImageError,
                            [styles['category__image--visible']]: isImageLoaded || hasImageError,
                        })}
                        decoding="async"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                </figure>

                <div className={styles.category__info}>
                    <h2 className={styles.category__title}>{currentCategory.name}</h2>
                    <div className={styles.category__meta} aria-live="polite">
                        Всего рецептов: <span className={styles.category__count}>{categoryRecipes.length}</span>
                    </div>
                    {currentCategory.description && (
                        <p className={styles.category__description}>{currentCategory.description}</p>
                    )}
                </div>
            </header>

            <hr className={styles.category__divider} aria-hidden="true" role="separator" />

            <section className={styles.category__recipes}>
                <h2 className={styles.category__sectionTitle}>Рецепты в категории</h2>
                <RecipesGrid recipes={categoryRecipes} />
            </section>
        </article>
    );
};
