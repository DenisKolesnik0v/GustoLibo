import { Tabs } from 'orcalib-ui-kit';

import cl from './UserData.module.scss';
import { UserRecipes } from '../UserRecipes';
import { UserProfile } from '../UserProfile';
import { UserCategories } from '../UserCategories';

export const UserData = () => {
    return (
        <div className={cl['profile-user-data']}>
            <Tabs
                tabs={[
                    { id: '1', label: 'Профиль', content: <UserProfile /> },
                    { id: '2', label: 'Рецепты', content: <UserRecipes /> },
                    { id: '3', label: 'Категории', content: <UserCategories /> },
                ]}
                defaultActiveTab='2'
            />
        </div>
    );
};
