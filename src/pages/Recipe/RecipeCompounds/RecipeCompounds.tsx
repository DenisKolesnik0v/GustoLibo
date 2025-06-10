import React from 'react';
import classnames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';
import { useDispatch } from 'react-redux';

import { ICompound } from '@utils/models/recipe';
import { titleForUnits } from '@utils/titleForUnits';
import { setFastQuery } from '@redux/actions/extras';

import cl from './RecipeCompounds.module.scss';

interface RecipeCompProps {
    compounds: ICompound[];
}

export const RecipeCompounds: React.FC<RecipeCompProps> = ({
    compounds,
}) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    const handleFastQueryByCompound = (e: string): undefined => {
        dispatch(setFastQuery(e));
    };

    if (compounds.length < 1) return <h2>Ингредиенты отсутсвуют</h2>;

    return (
        <section className={cl['comp']}>
            <ul className={cl['comp__list']}>
                {compounds.map((item, key) => (
                    <li
                        key={`${item.name}-${key}`}
                        className={classnames(
                            cl['comp__list-item'],
                            cl[`comp__list-item-theme-${theme}`],
                        )}
                        title={titleForUnits(item.unit)}
                    >
                        <div
                            role="presentation"
                            className={cl['comp__list-item-name']}
                            onClick={() => handleFastQueryByCompound(item.name)}
                        >
                            {item.name}
                        </div>

                        <span className={classnames(
                            cl['comp__list-item-counter'],
                            cl[`comp__list-item-counter-theme-${theme}`],
                        )}>
                            {key + 1}
                        </span>

                        <div className={classnames(
                            cl['comp__list-item-divider'],
                            cl[`comp__list-item-divider-theme-${theme}`],
                        )} />

                        <span className={cl['comp__list-item-amount']}>
                            {item.amount} {item.unit}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
