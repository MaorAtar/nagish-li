import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Search } from 'lucide-react';
import type { Venue } from '../types';
import { generateAccessInfo } from '../service/AIModel'; 

interface PlaceSearchProps {
  onPlaceSelect: (venue: Venue) => void;
  onGeneratingChange?: (isGenerating: boolean) => void;
}

export const PlaceSearch: React.FC<PlaceSearchProps> = ({ onPlaceSelect, onGeneratingChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
      language: 'he',
      region: 'IL'
    });

    loader.load().then(() => {
      if (inputRef.current) {
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'il' },
          fields: [
            'place_id',
            'name',
            'formatted_address',
            'geometry',
            'formatted_phone_number',
            'opening_hours',
            'types',
            'rating',
            'photos'
          ],
          language: 'he'
        });

        autocompleteRef.current.addListener('place_changed', async () => {
          const place = autocompleteRef.current?.getPlace();
          if (place) {
            const name = place.name || '';
            const address = place.formatted_address || '';
        
            setIsGenerating(true);
            onGeneratingChange?.(true);
        
            const accessibilityInfo = await generateAccessInfo(name, address);
        
            const features = [];
            if (accessibilityInfo.isWheelchairAccessible) features.push('wheelchair_accessible');
            if (accessibilityInfo.hasAccessibleRestrooms) features.push('accessible_restroom');
            if (accessibilityInfo.hasAccessibleParking) features.push('accessible_parking');
            if (accessibilityInfo.hasElevator) features.push('elevator');
            if (accessibilityInfo.hasBrailleSigns) features.push('braille');

            const venue: Venue = {
              id: place.place_id || String(Date.now()),
              name,
              category: mapGoogleTypeToCategory(place.types || []),
              address,
              phone: place.formatted_phone_number || '',
              features,
              openingHours:
                place.opening_hours?.weekday_text?.reduce((acc: Record<string, string>, day) => {
                  const [name, hours] = day.split(': ');
                  acc[name] = hours;
                  return acc;
                }, {}) || {},
              description: accessibilityInfo?.comments || '',
              imageUrl:
                place.photos?.[0]?.getUrl() ||
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
              rating: place.rating || 0,
              suitableFor: [],
              location: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0
              }
            };
            onPlaceSelect(venue);
            setIsGenerating(false);
            onGeneratingChange?.(false);
          }
        });
      }
      setIsLoading(false);
    });
  }, [onPlaceSelect]);

  const mapGoogleTypeToCategory = (types: string[]): Venue['category'] => {
    if (types.includes('restaurant')) return 'restaurant';
    if (types.includes('movie_theater')) return 'movie_theater';
    if (types.includes('shopping_mall')) return 'shopping_mall';
    if (types.includes('museum')) return 'museum';
    if (types.includes('park')) return 'park';
    if (types.includes('swimming_pool')) return 'pool';
    return 'restaurant';
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          placeholder={isLoading ? 'טוען...' : 'חפש עסק בישראל...'}
          className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
