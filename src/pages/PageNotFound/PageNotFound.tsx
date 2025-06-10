import React from 'react';
import classnames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';

import cl from './PageNotFound.module.scss';

export const PageNotFound: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={classnames(cl['error-page'], cl[`error-page-theme-${theme}`])}>
            <h1>Страница не найдена</h1>
        </div>
    );
};
