export const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';

export const FETCH_COUNTRY_BY_NAME_REQUEST = 'FETCH_COUNTRY_BY_NAME_REQUEST';
export const FETCH_COUNTRY_BY_NAME_SUCCESS = 'FETCH_COUNTRY_BY_NAME_SUCCESS';
export const FETCH_COUNTRY_BY_NAME_FAILURE = 'FETCH_COUNTRY_BY_NAME_FAILURE';

export const FETCH_REGIONS_REQUEST = 'FETCH_REGIONS_REQUEST';
export const FETCH_REGIONS_SUCCESS = 'FETCH_REGIONS_SUCCESS';
export const FETCH_REGIONS_FAILURE = 'FETCH_REGIONS_FAILURE';

export const FETCH_REGION_BY_NAME_REQUEST = 'FETCH_REGION_BY_NAME_REQUEST';
export const FETCH_REGION_BY_NAME_SUCCESS = 'FETCH_REGION_BY_NAME_SUCCESS';
export const FETCH_REGION_BY_NAME_FAILURE = 'FETCH_REGION_BY_NAME_FAILURE';

export const FETCH_COUNTRIES_BY_REGION_REQUEST = 'FETCH_COUNTRIES_BY_REGION_REQUEST';
export const FETCH_COUNTRIES_BY_REGION_SUCCESS = 'FETCH_COUNTRIES_BY_REGION_SUCCESS';
export const FETCH_COUNTRIES_BY_REGION_FAILURE = 'FETCH_COUNTRIES_BY_REGION_FAILURE';

export const SET_QUERY = 'SET_QUERY';

export interface ICountry {
    name: { en: string; ru: string };
    code: string;
    flagUrl: string;
    region: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRegion {
    name: { en: string; ru: string };
    description?: { en: string; ru: string };
    createdAt: Date;
    updatedAt: Date;
}

export const fetchCountriesRequest = () => ({ type: FETCH_COUNTRIES_REQUEST });
export const fetchCountriesSuccess = (countries: ICountry[]) => ({ type: FETCH_COUNTRIES_SUCCESS, payload: countries });
export const fetchCountriesFailure = (error: string) => ({ type: FETCH_COUNTRIES_FAILURE, payload: error });

export const fetchCountryByNameRequest = (name: string) => ({ type: FETCH_COUNTRY_BY_NAME_REQUEST, payload: name });
export const fetchCountryByNameSuccess = (country: ICountry) => ({ type: FETCH_COUNTRY_BY_NAME_SUCCESS, payload: country });
export const fetchCountryByNameFailure = (error: string) => ({ type: FETCH_COUNTRY_BY_NAME_FAILURE, payload: error });

export const fetchRegionsRequest = () => ({ type: FETCH_REGIONS_REQUEST });
export const fetchRegionsSuccess = (regions: IRegion[]) => ({ type: FETCH_REGIONS_SUCCESS, payload: regions });
export const fetchRegionsFailure = (error: string) => ({ type: FETCH_REGIONS_FAILURE, payload: error });

export const fetchRegionByNameRequest = (name: string) => ({ type: FETCH_REGION_BY_NAME_REQUEST, payload: name });
export const fetchRegionByNameSuccess = (region: IRegion) => ({ type: FETCH_REGION_BY_NAME_SUCCESS, payload: region });
export const fetchRegionByNameFailure = (error: string) => ({ type: FETCH_REGION_BY_NAME_FAILURE, payload: error });

export const fetchCountriesByRegionRequest = (regionName: string) => ({ type: FETCH_COUNTRIES_BY_REGION_REQUEST, payload: regionName });
export const fetchCountriesByRegionSuccess = (countries: ICountry[]) => ({ type: FETCH_COUNTRIES_BY_REGION_SUCCESS, payload: countries });
export const fetchCountriesByRegionFailure = (error: string) => ({ type: FETCH_COUNTRIES_BY_REGION_FAILURE, payload: error });

export const setFastQuery = (compound: string) => ({
    type: SET_QUERY,
    payload: compound,
});