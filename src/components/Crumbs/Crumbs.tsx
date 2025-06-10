import React from 'react';
import { useNavigate } from 'react-router-dom';

import useCrumbs from '@hooks/useCrumbs';

import cl from './Crumbs.module.scss';

interface CrumbsProps {
    title: string;
}

export const Crumbs: React.FC<CrumbsProps> = ({ title }) => {
    const navigate = useNavigate();
    const crumbs = useCrumbs();
    const fullCrumbs = [...crumbs, title];

    return (
        <nav aria-label="breadcrumb" className={cl.crumbsWrapper}>
            <ol className={cl.crumbsContainer}>
                {fullCrumbs.map((crumb, index) => {
                    const isLast = index === fullCrumbs.length - 1;

                    return (
                        <li key={index} className={cl.crumbItem}>
                            {isLast
                                ? (
                                    <span
                                        className={cl.currentCrumb}
                                        aria-current="page"
                                    >
                                        {crumb}
                                    </span>
                                )
                                : (
                                    <a
                                        className={cl.link}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/');
                                        }}
                                    >
                                        {crumb}
                                    </a>
                                )}
                            {!isLast && <span className={cl.separator}>{'>'}</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
