import { Device } from "@utils/models/profile";

export const GET_DEVICES = 'GET_DEVICES';
export const GET_DEVICES_SUCCESS = 'GET_DEVICES_SUCCESS';
export const GET_DEVICES_FAILURE = 'GET_DEVICES_FAILURE';
export const DELETE_DEVICE_REQUEST = 'DELETE_DEVICE_REQUEST';
export const DELETE_DEVICE_SUCCESS = 'DELETE_DEVICE_SUCCESS';
export const DELETE_DEVICE_FAILURE = 'DELETE_DEVICE_FAILURE';

export const deleteDeviceRequest = (id: string) => ({
    type: DELETE_DEVICE_REQUEST,
    payload: id,
});

export const deleteDeviceSuccess = (id: string) => ({
    type: DELETE_DEVICE_SUCCESS,
    payload: id,
});

export const deleteDeviceFailure = (error: string) => ({
    type: DELETE_DEVICE_FAILURE,
    payload: error,
});

export const getDevices = () => ({
    type: GET_DEVICES,
});

export const getDevicesSuccess = (devices: Device[]) => ({
    type: GET_DEVICES_SUCCESS,
    payload: devices,
});

export const getDevicesFailure = (error: string) => ({
    type: GET_DEVICES_FAILURE,
    payload: error,
});
