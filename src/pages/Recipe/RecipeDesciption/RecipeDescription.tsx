import React from 'react';
import classnames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';

import cl from './RecipeDescription.module.scss';

interface ReactDProps {
    description: string;
}

export const RecipeDescription: React.FC<ReactDProps> = ({
    description,
}) => {
    const { theme } = useTheme();

    return (
        <section>
            <span className={classnames(cl['heading'], cl[`heading__theme-${theme}`])}>{description}</span>
        </section>
    );
};
