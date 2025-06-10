import { call, put, takeEvery } from 'redux-saga/effects';

import apiClient from '../../utils/apiClient';
import {
    getDevicesSuccess,
    getDevicesFailure,
    GET_DEVICES,
    deleteDeviceFailure,
    deleteDeviceSuccess,
    DELETE_DEVICE_REQUEST
} from '@redux/actions/device';

function* getDevicesSaga(): Generator<any, void, any> {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            yield put(getDevicesFailure('Token not found'));
            return;
        }

        const devices = yield call(apiClient.get, `/profile/user-devices`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (devices) {
            yield put(getDevicesSuccess(devices));
        } else {
            yield put(getDevicesFailure('No devices found'));
        }
    } catch (error: any) {
        yield put(getDevicesFailure(error.message || 'Error loading devices'));
    }
}

function* deleteDeviceSaga(action: { type: string; payload: string }) {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            yield put(deleteDeviceFailure('Unauthorized'));
            return;
        }

        yield call(apiClient.delete, `/profile/exit-device/${action.payload}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        yield put(deleteDeviceSuccess(action.payload));
    } catch (error: any) {
        yield put(deleteDeviceFailure(error.message || 'Failed to delete device'));
    }
}

export function * deviceSaga (): Generator<any, void, any> {
    yield takeEvery(GET_DEVICES, getDevicesSaga);
    yield takeEvery(DELETE_DEVICE_REQUEST, deleteDeviceSaga);
}
