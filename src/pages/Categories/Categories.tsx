import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, useTheme } from 'orcalib-ui-kit';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '@redux/store';
import { CategoryCard } from '@components/CategoryCard';
import { fetchAllCategoriesRequest, ICategory } from '@redux/actions/categories';
import { Loader } from '@components/Loader';

import cl from './Categories.module.scss';

export const Categories: React.FC = () => {
    const { categories, loading } = useSelector((state) => state.category);
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllCategoriesRequest());
    }, [dispatch]);

    if (loading || !categories) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className={classnames(cl['title'], cl[`title-theme-${theme}`])}>Категории</h1>
            <div className={classnames(cl.border__line)} />
            <Grid columns={{ md: 2, lg: 3, xl: 4 }}>
                {
                    categories.map((item: ICategory, index: number) => (
                        <div
                            key={`${item.name}-${index}-${item.createdAt}`}
                            role="presentation"
                            onClick={() => navigate(item.name)}
                        >
                            <CategoryCard
                                key={`${item.createdAt}-${index}-${item.name}`}
                                title={item.name}
                                recipeCount={0}
                                onClick={function (): void {
                                    throw new Error('Function not implemented.');
                                }}
                                size="lg"
                                imageUrl={`/img/categories/${item.name.toLowerCase()}.svg`}
                            />
                        </div>
                    ))
                }
            </Grid>
        </div>
    );
};
