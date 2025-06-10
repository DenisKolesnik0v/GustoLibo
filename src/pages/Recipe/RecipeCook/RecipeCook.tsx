import React from 'react';
import classnames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';

import cl from './RecipeCook.module.scss';

interface RecipeCookProps {
    cooking: string[],
}

export const RecipeCook: React.FC<RecipeCookProps> = ({ cooking }) => {
    const { theme } = useTheme();

    if (cooking.length < 1) return <h2>Рецепт отсутствует</h2>;

    return (
        <section className={cl['recipe-cook']}>
            <ul className={classnames(cl['recipe-cook__list'])}>
                {cooking.map((item, index) => (
                    <li
                        key={`${item}-${index}`}
                        className={classnames(
                            cl['recipe-cook__step'],
                            cl[`recipe-cook__item-theme-${theme}`],
                        )}
                    >
                        <div
                            className={cl['flat-circle']}
                            style={{
                                left: index % 2 === 0 ? '20px' : 'auto',
                                right: index % 2 !== 0 ? '20px' : 'auto',
                            }}
                        >
                            {index + 1}
                        </div>
                        <span className={cl['recipe-cook__item']}>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
