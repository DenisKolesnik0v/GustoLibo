import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
    TypedUseSelectorHook,
    useSelector as reduxUseSelector
} from 'react-redux';

import {
    authReducer,
    categoryReducer,
    deviceReducer,
    extrasReducer,
    recipeReducer,
    userCategoryReducer,
} from './reducers';
import {
    authSaga,
    categorySaga,
    deviceSaga,
    extrasSaga,
    recipeSaga,
    userCategorySaga,
} from './saga';

const rootReducer = combineReducers({
    auth: authReducer,
    device: deviceReducer,
    recipe: recipeReducer,
    userCategory: userCategoryReducer,
    extras: extrasReducer,
    category: categoryReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(authSaga);
sagaMiddleware.run(deviceSaga);
sagaMiddleware.run(recipeSaga);
sagaMiddleware.run(userCategorySaga);
sagaMiddleware.run(extrasSaga);
sagaMiddleware.run(categorySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
