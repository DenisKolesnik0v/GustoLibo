/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import { LatLngExpression, GeoJSON as LeafletGeoJSON, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Feature, FeatureCollection } from 'geojson';
import { Select, Button, useTheme } from 'orcalib-ui-kit';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import bbox from '@turf/bbox';

import { useSelector } from '@redux/store';
import { RecipesGrid } from '@components/RecipesGrid';
import { Loader } from '@components/Loader';
import {
    fetchCountriesByRegionRequest,
    fetchCountriesRequest,
    ICountry,
} from '@redux/actions/extras';
import {
    fetchRecipesByCountry,
    fetchRecipesByRegion,
} from '@redux/actions/categories';

import styles from './WorldMap.module.scss';

const REGION_TRANSLATIONS: Record<string, string> = {
    Africa: 'Африка',
    Americas: 'Америка',
    Asia: 'Азия',
    Europe: 'Европа',
    Oceania: 'Океания',
    Antarctica: 'Антарктида',
};

export const WorldMap: React.FC = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    const countryLocalStorage = localStorage.getItem('countryToFind');
    const { countries, countriesByRegion } = useSelector((state) => state.extras);
    const { regionRecipes, countryRecipes, loading } = useSelector((state) => state.category);
    const [geojsonData, setGeojsonData] = useState<FeatureCollection | null>(null);
    const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([
        { value: '', label: 'Не указана' },
    ]);
    const [regionOptions] = useState<{ value: string; label: string }[]>([
        { value: '', label: 'Не указан' },
        ...Object.entries(REGION_TRANSLATIONS).map(([key, label]) => ({ value: key, label })),
    ]);
    const [selectedCountry, setSelectedCountry] = useState<string>(countryLocalStorage || '');
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [highlightRegion, setHighlightRegion] = useState<boolean>(false);
    const geoJsonLayerRef = useRef<LeafletGeoJSON | null>(null);
    const mapRef = useRef<any>(null);
    const countriesToHighlight = useMemo(
        () => (highlightRegion ? countriesByRegion.map((country: ICountry) => country.name.en) : []),
        [highlightRegion, countriesByRegion],
    );

    const center: LatLngExpression = [51.505, -0.09];
    const zoom = 4;

    const debouncedFetchCountriesByRegion = useCallback(
        debounce((region: string) => {
            if (region) dispatch(fetchCountriesByRegionRequest(region));
        }, 50),
        [dispatch],
    );

    useEffect(() => {
        dispatch(fetchCountriesRequest());
    }, [dispatch]);

    useEffect(() => {
        if (selectedRegion) debouncedFetchCountriesByRegion(selectedRegion);
    }, [selectedRegion, debouncedFetchCountriesByRegion]);

    useEffect(() => {
        if (selectedRegion && !selectedCountry) {
            dispatch({ type: 'RESET_RECIPES' });
            dispatch(fetchRecipesByRegion(selectedRegion));
        } else if (selectedCountry && !selectedRegion) {
            dispatch({ type: 'RESET_RECIPES' });
            dispatch(fetchRecipesByCountry(selectedCountry));
        }
    }, [dispatch, selectedRegion, selectedCountry]);

    useEffect(() => {
        if (mapRef.current) {
            const container = mapRef.current.getContainer();
            container.style.background = theme === 'light' ? '#f4f6f6' : '#3b3b3b';
        }
    }, [theme]);

    useEffect(() => {
        if (countries.length) {
            const options = countries
                .filter((country: ICountry) => !selectedRegion || country.region === selectedRegion)
                .map((country: ICountry) => ({
                    value: country.name.en,
                    label: country.name.ru,
                }))
                .sort((a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label));
            setCountryOptions([{ value: '', label: 'Не указана' }, ...options]);
        }
    }, [countries, selectedRegion]);

    useEffect(() => {
        fetch('/map.geojson')
            .then((response) => response.json())
            .then((data) => setGeojsonData(data))
            .catch((error) => console.error('Error loading GeoJSON:', error));
    }, []);

    const getCountryStyle = useCallback((isSelected: boolean, isHighlighted: boolean) => ({
        weight: isSelected ? 3 : isHighlighted ? 2 : 1,
        color: isSelected ? '#e54b5d' : isHighlighted ? '#33ff57' : '#3388ff',
        fillOpacity: isSelected ? 0.9 : isHighlighted ? 0.7 : 0.5,
    }), []);

    useEffect(() => {
        if (geoJsonLayerRef.current && geojsonData) {
            geoJsonLayerRef.current.eachLayer((layer: any) => {
                const countryName = layer.feature?.properties?.name_en;
                const isHighlighted = countriesToHighlight.includes(countryName);
                const isSelected = countryName === selectedCountry;
                layer.setStyle(getCountryStyle(isSelected, isHighlighted));
            });
        }
    }, [selectedCountry, geojsonData, highlightRegion, countriesToHighlight, getCountryStyle]);

    const getCountryBounds = useCallback(
        (countryName: string): LatLngBounds | null => {
            if (!geojsonData || !countryName) {
                return null;
            }

            const countryFeature = geojsonData.features.find(
                (feature) => feature.properties?.name_en === countryName,
            );

            if (!countryFeature || !countryFeature.geometry) {
                return null;
            }

            try {
                const [minLng, minLat, maxLng, maxLat] = bbox(countryFeature);
                const bounds = new LatLngBounds(
                    [minLat, minLng],
                    [maxLat, maxLng],
                );

                return bounds;
            } catch (error) {
                console.error(`Error computing bounds for ${countryName}:`, error);
                return null;
            }
        },
        [geojsonData],
    );

    const getRegionBounds = useCallback(
        (regionName: string): LatLngBounds | null => {
            if (!geojsonData || !regionName || !countriesByRegion.length) {
                return null;
            }

            const regionCountries = countriesByRegion.map((country: ICountry) => country.name.en);
            const regionFeatures = geojsonData.features.filter(
                (feature) => feature.properties?.name_en && regionCountries.includes(feature.properties.name_en),
            );

            if (!regionFeatures.length) {
                return null;
            }

            try {
                const regionFeatureCollection: FeatureCollection = {
                    type: 'FeatureCollection',
                    features: regionFeatures,
                };

                const [minLng, minLat, maxLng, maxLat] = bbox(regionFeatureCollection);
                const bounds = new LatLngBounds(
                    [minLat, minLng],
                    [maxLat, maxLng],
                );

                return bounds;
            } catch (error) {
                console.error(`Error computing bounds for region ${regionName}:`, error);
                return null;
            }
        },
        [geojsonData, countriesByRegion],
    );

    const getBounds = useCallback(() => {
        if (!geojsonData) {
            return new LatLngBounds([[-90, -180], [90, 180]]);
        }

        try {
            const [minLng, minLat, maxLng, maxLat] = bbox(geojsonData);
            const bounds = new LatLngBounds(
                [minLat, minLng],
                [maxLat, maxLng],
            );

            return bounds;
        } catch (error) {
            console.error('Error computing global bounds:', error);
            return new LatLngBounds([[-90, -180], [90, 180]]);
        }
    }, [geojsonData]);

    useEffect(() => {
        if (!mapRef.current || !geojsonData) return;

        const adjustZoomForCountry = (bounds: LatLngBounds) => {
            if (!mapRef.current) return;

            mapRef.current.flyToBounds(bounds, { padding: [50, 50], duration: 0.5 });

            setTimeout(() => {
                if (!mapRef.current) return;

                const boundsWidth = bounds.getEast() - bounds.getWest();
                const mapBounds = mapRef.current.getBounds();

                if (!mapBounds) return;

                const mapWidth = mapBounds.getEast() - mapBounds.getWest();
                const targetWidthRatio = 0.4;
                const zoomAdjustment = Math.log2(mapWidth / (boundsWidth / targetWidthRatio));
                const currentZoom = mapRef.current.getZoom();
                const newZoom = Math.min(
                    Math.max(currentZoom + zoomAdjustment, 4),
                    10,
                );
                const center = bounds.getCenter();
                mapRef.current.setView(center, Math.round(newZoom));
            }, 500);
        };

        if (selectedCountry) {
            const bounds = getCountryBounds(selectedCountry);
            if (bounds && bounds.isValid()) {
                adjustZoomForCountry(bounds);
            } else {
                mapRef.current.setView(center, zoom);
            }
        } else if (selectedRegion) {
            const bounds = getRegionBounds(selectedRegion);
            if (bounds && bounds.isValid()) {
                mapRef.current.flyToBounds(bounds, { padding: [50, 50], maxZoom: 5, duration: 0.5 });
            } else {
                mapRef.current.setView(center, zoom);
            }
        } else {
            mapRef.current.setView(center, zoom);
        }
    }, [selectedCountry, selectedRegion, getCountryBounds, getRegionBounds, center, zoom, geojsonData]);

    const onEachCountry = (country: Feature, layer: LeafletGeoJSON) => {
        if (!country.properties) return;

        const countryName = country.properties.name_en;

        layer.on({
            mouseover: () => {
                const isHighlighted = countriesToHighlight.includes(countryName);
                const isSelected = countryName === selectedCountry;
                if (highlightRegion) {
                    return;
                }

                const baseStyle = getCountryStyle(isSelected, isHighlighted);
                layer.setStyle({
                    ...baseStyle,
                    weight: baseStyle.weight + 1,
                    color: isSelected ? '#e54b5d' : '#ff5555',
                    fillOpacity: Math.min(baseStyle.fillOpacity + 0.1, 1),
                });
            },
            mouseout: () => {
                if (highlightRegion) {
                    return;
                }
                const isHighlighted = countriesToHighlight.includes(countryName);
                const isSelected = countryName === selectedCountry;
                layer.setStyle(getCountryStyle(isSelected, isHighlighted));
            },
            click: () => {
                setSelectedCountry((prev) => (prev === countryName ? '' : countryName));
                setHighlightRegion(false);
                if (countryName !== selectedCountry) setSelectedRegion('');
            },
        });
    };

    const handleCountryInputChange = (value: string | null) => {
        setSelectedCountry(value || '');
        setHighlightRegion(false);
        if (!value) resetAll();
    };

    const handleRegionInputChange = (value: string | null) => {
        setSelectedRegion(value || '');
        setHighlightRegion(true);
        setSelectedCountry('');
        if (!value) resetAll();
    };

    const resetAll = () => {
        setSelectedCountry('');
        setSelectedRegion('');
        setHighlightRegion(false);
    };

    return (
        <div className={styles.worldMap}>
            <h1 className={classNames(styles.worldMap__title, styles[`worldMap__title--${theme}`])}>
                Карта мира
            </h1>
            <div className={styles.worldMap__controls}>
                <Button text="Сбросить" onClick={resetAll} />
            </div>
            <div className={styles.worldMap__selects}>
                <Select
                    options={regionOptions}
                    value={selectedRegion}
                    onChange={handleRegionInputChange}
                    size="lg"
                    placeholder="Регион"
                />
                <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={handleCountryInputChange}
                    size="lg"
                    placeholder="Страна происхождения"
                />
            </div>
            <MapContainer
                ref={mapRef}
                center={center}
                zoom={zoom}
                className={classNames(styles.worldMap__map, styles[`worldMap__map--${theme}`])}
                maxBounds={getBounds()}
                maxZoom={10}
                minZoom={2}
                attributionControl={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {geojsonData && (
                    <GeoJSON
                        ref={geoJsonLayerRef}
                        key={`geojson-${selectedCountry}-${highlightRegion}`}
                        data={geojsonData}
                        onEachFeature={onEachCountry}
                    />
                )}
            </MapContainer>
            <div className={styles.worldMap__results}>
                {loading || (!selectedCountry && !selectedRegion)
                    ? (
                        <Loader />
                    )
                    : (
                        <div>
                            <div className={styles.worldMap__info}>
                                <h2 className={classNames(styles.worldMap__title, styles[`worldMap__title--${theme}`])}>
                                    Результат поиска по &quot;{selectedCountry || selectedRegion}&quot;
                                </h2>
                                <p>Всего рецептов: {regionRecipes.length}</p>
                            </div>
                            {selectedRegion && <RecipesGrid recipes={regionRecipes} />}
                            {selectedCountry && <RecipesGrid recipes={countryRecipes} />}
                        </div>
                    )}
            </div>
        </div>
    );
};
