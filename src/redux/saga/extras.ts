import { call, put, takeEvery } from 'redux-saga/effects';
import apiClient from '../../utils/apiClient';

import {
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchCountryByNameSuccess,
  fetchCountryByNameFailure,
  fetchRegionsSuccess,
  fetchRegionsFailure,
  fetchRegionByNameSuccess,
  fetchRegionByNameFailure,
  fetchCountriesByRegionSuccess,
  fetchCountriesByRegionFailure,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRY_BY_NAME_REQUEST,
  FETCH_REGIONS_REQUEST,
  FETCH_REGION_BY_NAME_REQUEST,
  FETCH_COUNTRIES_BY_REGION_REQUEST,
  ICountry,
  IRegion,
} from '../actions/extras';

function* fetchCountries() {
  try {
    const response: ICountry[] = yield call(apiClient.get, '/extras/countries');
    yield put(fetchCountriesSuccess(response));
  } catch (error) {
    yield put(fetchCountriesFailure('Failed to fetch countries'));
  }
}

function* fetchCountryByName(action: any) {
  try {
    const response: ICountry = yield call(apiClient.get, `/extras/country/${action.payload}`);
    yield put(fetchCountryByNameSuccess(response));
  } catch (error) {
    yield put(fetchCountryByNameFailure('Failed to fetch country'));
  }
}

function* fetchRegions() {
  try {
    const response: IRegion[] = yield call(apiClient.get, '/extras/regions');
    yield put(fetchRegionsSuccess(response));
  } catch (error) {
    yield put(fetchRegionsFailure('Failed to fetch regions'));
  }
}

function* fetchRegionByName(action: any) {
  try {
    const response: IRegion = yield call(apiClient.get, `/extras/region/${action.payload}`);
    yield put(fetchRegionByNameSuccess(response));
  } catch (error) {
    yield put(fetchRegionByNameFailure('Failed to fetch region'));
  }
}

function* fetchCountriesByRegion(action: any) {
  try {
    const response: ICountry[] = yield call(apiClient.get, `/extras/countries/region/${action.payload}`);
    yield put(fetchCountriesByRegionSuccess(response));
  } catch (error) {
    yield put(fetchCountriesByRegionFailure('Failed to fetch countries by region'));
  }
}

export function* extrasSaga() {
  yield takeEvery(FETCH_COUNTRIES_REQUEST, fetchCountries);
  yield takeEvery(FETCH_COUNTRY_BY_NAME_REQUEST, fetchCountryByName);
  yield takeEvery(FETCH_REGIONS_REQUEST, fetchRegions);
  yield takeEvery(FETCH_REGION_BY_NAME_REQUEST, fetchRegionByName);
  yield takeEvery(FETCH_COUNTRIES_BY_REGION_REQUEST, fetchCountriesByRegion);
}
