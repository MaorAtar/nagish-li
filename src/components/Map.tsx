import React from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import type { Venue } from '../types';

interface MapProps {
  venues: Venue[];
}

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 31.7683,
  lng: 35.2137
};

const mapOptions: google.maps.MapOptions = {
  language: 'he',
  region: 'IL',
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  zoomControl: true
};

export const Map: React.FC<MapProps> = ({ venues }) => {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={venues[0]?.location || defaultCenter}
      zoom={12}
      options={mapOptions}
    >
      {venues.map((venue) => (
        venue.location && (
          <MarkerF
            key={venue.id}
            position={venue.location}
            title={venue.name}
          />
        )
      ))}
    </GoogleMap>
  );
};