import React from 'react';
import classnames from 'classnames';

import cl from './Loader.module.scss';

interface LoaderProps {
    color?: string;
    backgroundColor?: string;
    height?: number;
    speed?: number;
    className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
    color = '#d70026',
    backgroundColor = '#e0e0e0',
    height = 4,
    speed = 2,
    className = '',
}) => {
    return (
        <div
            className={classnames(cl[`loader-container`], cl[`${className}`])}
            style={{
                '--loader-height': `${height}px`,
                '--loader-bg-color': backgroundColor,
                '--loader-speed': `${speed}s`,
                '--loader-color': color,
            } as React.CSSProperties}
        >
            <div className={cl['loader-bar']} />
        </div>
    );
};
