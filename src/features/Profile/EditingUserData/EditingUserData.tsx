import React from 'react';
import { Tabs } from 'orcalib-ui-kit';

import { UserSettings } from '../UserSettings';
import { UserDevices } from '../UserDevices';
import cl from './EditingUserData.module.scss';

export const EditingUserData: React.FC = () => {
    return (
        <div className={cl['editing-user-data']}>
            <Tabs
                tabs={[
                    { id: '1', label: 'Настройки', content: <UserSettings /> },
                    { id: '2', label: 'Устройства', content: <UserDevices /> },
                ]}

            />
        </div>
    );
};
