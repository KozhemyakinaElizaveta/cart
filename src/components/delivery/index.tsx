import React, { useRef, useEffect, useCallback } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { InputsBox } from './InputsBox';
import styles from './Delivery.module.css';
import { DeliveryMethod } from './DeliveryMethod';
import { SET_DELIVERY_FORM_VALUE } from '../../services/actions/delivery-actions';
import MapSuggestComponent from './DeliverySuggestInput';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getAddress } from '../../services/store';

const mapState = {
    center: [55.753994, 37.622093],
    zoom: 9,
    behaviors: ['scrollZoom'],
    controls: []
};

export const Delivery: React.FC = () => {
    const address = useAppSelector(getAddress);
    const dispatch = useAppDispatch();
    const ymaps = useRef<any>(null);
    const placemarkRef = useRef<any>(null);
    const mapRef = useRef<any>(null);

    const setAddress = (address: string) => {
        dispatch({ type: SET_DELIVERY_FORM_VALUE, field: 'address', value: address });
    };

    const getGeocodeResult = async (criteria: string) => {
        return !!ymaps.current && !!criteria ? await ymaps.current.geocode(criteria) : null;
    };

    const createPlacemark = useCallback(
        (coords: number[]) => {
        return new ymaps.current.Placemark(
            coords,
            {},
            {
            preset: 'islands#blueCircleDotIcon'
            }
        );
        },
        [ymaps]
    );

    const getAddressByCoords = async (coords: number[]) => {
        placemarkRef.current?.properties.set('iconCaption', 'Загрузка...');
        const result = await getGeocodeResult(coords.join(','));
        if (result) {
        const newAddress = getAddressFromGeocodeResult(result);
        setAddress(newAddress);

        placemarkRef.current?.properties.set({
            iconCaption: ''
        });
        }
    };

    const getAddressFromGeocodeResult = useCallback(
        (data: any) => {
        const firstGeoObject = data.geoObjects.get(0);
        const newAddress = [
            firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            !!firstGeoObject.getPremiseNumber() && firstGeoObject.getPremiseNumber()
        ]
            .filter(Boolean)
            .join(', ');
        return newAddress;
        },
        []
    );

    const zoomToPoint = (coords: number[]) => {
        mapRef.current?.setCenter(coords);

        mapRef.current?.setZoom(18, {
        smooth: true,
        position: coords,
        centering: true,
        duration: 5000
        });
    };

    const updatePlaceMark = async () => {
        const result = await getGeocodeResult(address);
        if (result) {
        const firstObject = result.geoObjects.get(0);
        if (firstObject) {
            const coords = result.geoObjects.get(0).geometry.getCoordinates();
            renderPlaceMark(coords);
            zoomToPoint(coords);
        }
        }
    };

    const renderPlaceMark = useCallback(
        (coords: number[]) => {
        if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
        } else {
            placemarkRef.current = createPlacemark(coords);
            mapRef.current?.geoObjects.add(placemarkRef.current);
        }
        },
        [createPlacemark]
    );

    const onMapClick = useCallback(
        (e: any) => {
        const coords = e.get('coords');
        renderPlaceMark(coords);
        getAddressByCoords(coords);
        },
        [getAddressByCoords, renderPlaceMark]
    );

    useEffect(() => {
        if (address) {
        updatePlaceMark();
        }
    }, [address]);

    const onLoad = (ymapsInstance: any) => {
        ymaps.current = ymapsInstance;
    };

    return (
        <section className={`${styles.delivery}`}>
        <div className={styles.inputbox}>
            <MapSuggestComponent onChange={setAddress} value={address} mapRef={mapRef} />
        </div>
        <div className={styles.map}>
            <YMaps query={{ apikey: '1cd1beec-adee-4ecd-b6df-7f00e68ef82e' }}>
            <Map
                modules={['Placemark', 'geocode', 'geoObject.addon.balloon']}
                instanceRef={mapRef}
                onLoad={onLoad}
                onClick={onMapClick}
                state={mapState}
                width="100%"
                height="280px"
            />
            </YMaps>
        </div>
        <InputsBox />
        <DeliveryMethod />
        </section>
    );
};

export default Delivery;
