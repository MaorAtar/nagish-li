export type AccessibilityFeature = 
  | 'wheelchair_accessible'
  | 'braille'
  | 'sign_language'
  | 'hearing_loop'
  | 'accessible_parking'
  | 'accessible_restroom'
  | 'guide_dog_friendly'
  | 'staff_assistance'
  | 'visual_alerts'
  | 'audio_description';

export type VenueCategory = 
  | 'restaurant'
  | 'pool'
  | 'movie_theater'
  | 'museum'
  | 'shopping_mall'
  | 'park';

export type DisabilityType = 
  | 'wheelchair'
  | 'visual'
  | 'hearing'
  | 'cognitive'
  | 'mobility';

export interface Venue {
  id: string;
  name: string;
  category: VenueCategory;
  address: string;
  phone: string;
  features: AccessibilityFeature[];
  openingHours: {
    [key: string]: string;
  };
  description: string;
  imageUrl: string;
  rating: number;
  suitableFor: DisabilityType[];
  location?: {
    lat: number;
    lng: number;
  };
}