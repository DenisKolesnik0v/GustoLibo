import React from 'react';

import { Crumbs } from '../../../components/Crumbs/Crumbs';
import cl from './RecipeCrumbs.module.scss';

interface RecipeCrumbsProps {
  recipeName: string;
}

export const RecipeCrumbs: React.FC<RecipeCrumbsProps> = ({ recipeName }) => {
    return (
        <div className={cl.wrapper}>
            <h1 className={cl.title}>
                {recipeName || 'Recipe'}
            </h1>
            <Crumbs title={recipeName} />
        </div>
    );
};
