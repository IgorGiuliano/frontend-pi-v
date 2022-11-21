/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useRef, useState } from 'react';
import '../styles/Map.scss';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const MapModelOne: React.FC = () => {
    const mapElement = useRef<HTMLDivElement>({} as HTMLDivElement);
    const [map, setMap] = useState({});
    const [latitude, setLatitude] = useState(-23.669215);
    const [longitude, setLongitude] = useState(-46.699595);

    const addDeliveryMarker = (lngLat: tt.LngLat, map: tt.Map) => {
        const element = document.createElement('div');
        element.className = 'marker-delivery';
        new tt.Marker({
            element
        })
            .setLngLat(lngLat)
            .addTo(map);
    };

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const origin = {
            lng: longitude,
            lat: latitude
        };
        const destinations = [];

        const map = tt.map({
            key: 'kYeVRIZUbFgxGN21TgzZ8uCGZbaTvGso',
            container: mapElement.current,
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true
            },
            center: [longitude, latitude],
            zoom: 17.6
        });
        setMap(map);

        const addMarker = () => {
            const element = document.createElement('div');
            element.className = 'marker-delivery';
            const marker = new tt.Marker({
                draggable: true,
                element
            })
                .setLngLat([longitude, latitude])
                .addTo(map);

            marker.on('dragend', () => {
                const lngLat = marker.getLngLat();
                setLongitude(lngLat.lng);
                setLatitude(lngLat.lat);
            });
        };
        addMarker();

        return () => map.remove();
    }, [longitude, latitude]);

    return (
        <div className="app">
            { map && (<div id="map" ref={mapElement} />)}
        </div>
    );
};

export default MapModelOne;
