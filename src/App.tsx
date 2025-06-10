import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { useTheme } from 'orcalib-ui-kit';

import { NavigationMenu } from '@components/NavigationMenu';
import { Header } from '@components/Header/Header';
import { validateToken } from '@redux/actions/auth';
import { useSelector } from '@redux/store';

import { WorldMap } from './pages/WorldMap';
import { Recipe } from './pages/Recipe/Recipe';
import { Category as CategoryUser } from './pages/Profile/router/Category';
import { Category } from './pages/Categories/router/Category';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/PageNotFound';
import { Profile } from './pages/Profile';
import { Categories } from './pages/Categories';
import AddRecipe from './pages/Profile/router/AddRecipe';

import 'orcalib-ui-kit/dist/orcalib-ui-kit.css';
import './App.scss';

function App () {
    const { theme } = useTheme();
    const [, setSearchQuery] = useState('');

    const { isAuth } = useSelector((state) => state.auth);
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        if (accessToken) {
            dispatch(validateToken());
        }
    }, [accessToken, dispatch]);

    return (
        <div className={classnames('app', `app-${theme}`)}>
            <div className={classnames('app__container', `app__container__theme-${theme}`)}>
                <Header
                    siteName="GustLibo"
                    onSearchChange={handleSearchChange}
                />
                <NavigationMenu />
                <main className="app__pages">
                    <Routes>
                        <Route path="/" element={<Suspense><Home /></Suspense>} />
                        <Route path="*" element={<Suspense><PageNotFound /></Suspense>} />
                        <Route path="/categories" element={<Suspense><Categories /></Suspense>} />
                        <Route path="/categories/:category" element={<Suspense><Category /></Suspense>} />
                        <Route path="/recipe/:recipeId" element={<Suspense><Recipe /></Suspense>} />
                        <Route path="/map" element={<Suspense><WorldMap /></Suspense>} />
                        {isAuth
                            ? (
                                <React.Fragment>
                                    <Route path="/profile" element={<Suspense><Profile /></Suspense>} />
                                    <Route path="/profile/add-recipe" element={<Suspense><AddRecipe /></Suspense>} />
                                    <Route path="/profile/category/:categoryId" element={<Suspense><CategoryUser /></Suspense>} />
                                </React.Fragment>
                            )
                            : null}
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
