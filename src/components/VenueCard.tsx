import React from 'react';
import { MapPin, Phone, Clock, Star, Volume2 } from 'lucide-react';
import { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const handleReadAloud = () => {
    const featureText = venue.features.map(f => translateFeature(f)).join(', ');
    const openingHoursText = Object.entries(venue.openingHours)
      .map(([days, hours]) => `${days}: ${hours}`)
      .join(', ');

    const textToRead = `
      שם המקום: ${venue.name}.
      דירוג: ${venue.rating} כוכבים.
      תיאור: ${venue.description}.
      כתובת: ${venue.address}.
      טלפון: ${venue.phone}.
      שעות פתיחה: ${openingHoursText}.
      אמצעי נגישות: ${featureText}.
    `;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={venue.imageUrl}
        alt={venue.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{venue.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-medium">{venue.rating}</span>
          </div>
        </div>

        <button
          onClick={handleReadAloud}
          className="mt-2 flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          <Volume2 className="w-4 h-4" /> הקרא מידע בקול
        </button>

        <p className="mt-2 text-gray-600">{venue.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{venue.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{venue.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div className="text-sm">
              {Object.entries(venue.openingHours).map(([days, hours]) => (
                <div key={days}>
                  <span className="font-medium">{days}:</span> {hours}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">אמצעי נגישות:</h4>
          <div className="flex flex-wrap gap-2">
            {venue.features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {translateFeature(feature)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function translateFeature(feature: string): string {
  const translations: Record<string, string> = {
    'wheelchair_accessible': 'נגיש לכיסאות גלגלים',
    'braille': 'כתב ברייל',
    'sign_language': 'שפת סימנים',
    'hearing_loop': 'לולאת השראה',
    'accessible_parking': 'חניית נכים',
    'accessible_restroom': 'שירותי נכים',
    'guide_dog_friendly': 'ידידותי לכלבי נחייה',
    'staff_assistance': 'סיוע צוות',
    'visual_alerts': 'התראות חזותיות',
    'audio_description': 'תיאור קולי',
    'elevator': 'מעלית נגישה',
  };

  return translations[feature] || feature;
}
