import {
    GET_DEVICES,
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAILURE,
    DELETE_DEVICE_SUCCESS,
    DELETE_DEVICE_FAILURE,
    DELETE_DEVICE_REQUEST,
} from '../actions/device';

type Device = {
    _id: string;
    device: string;
    createdAt: string;
};

type DeviceState = {
    loading: boolean;
    error: string | null;
    devices: Device[] | undefined;
};

const initialState: DeviceState = {
    loading: false,
    error: null,
    devices: undefined,
};

export const deviceReducer = (state = initialState, action: any): DeviceState => {
    switch (action.type) {
        case GET_DEVICES:
            return { ...state, loading: true, error: null };
        case GET_DEVICES_SUCCESS:
            return { ...state, loading: false, devices: action.payload };
        case GET_DEVICES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_DEVICE_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_DEVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                devices: state.devices?.filter((device) => device._id !== action.payload),
            };
        case DELETE_DEVICE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
