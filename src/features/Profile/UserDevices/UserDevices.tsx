import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Button, Icon, useTheme } from 'orcalib-ui-kit';

import { deleteDeviceRequest, getDevices } from '@redux/actions/device';
import { useSelector } from '@redux/store';

import cl from './UserDevices.module.scss';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
};

export const UserDevices: React.FC = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { devices } = useSelector((state) => state.device);

    useEffect(() => {
        dispatch(getDevices());
    }, [dispatch]);

    const handleExitDevice = (id: string) => {
        dispatch(deleteDeviceRequest(id));
    };

    return (
        <div className={classnames(cl['devices-container'])}>
            {devices && devices.length === 0
                ? (
                    <p>No devices found.</p>
                )
                : devices && devices.map((device, index) => (
                    <div
                        key={`data-${device.createdAt}-index-${index}`}
                        className={classnames(cl['devices-container-device'], cl[`devices-container-device-theme-${theme}`])}
                    >
                        <div>
                            <strong>Устройство:</strong>
                            <div className={classnames(cl['device-data'])}>
                                {device.device}
                            </div>
                            <strong>Время и дата входа:</strong>
                            <div className={classnames(cl['device-data'])}>
                                {formatDate(device.createdAt)}
                            </div>
                        </div>
                        <Button
                            text="Выйти"
                            icon={<Icon icon="logout" className={cl.mirror} />}
                            iconPosition="right"
                            size="sm"
                            onClick={() => handleExitDevice(device._id)}

                        />
                    </div>
                ))}
        </div>
    );
};
