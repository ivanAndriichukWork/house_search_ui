export enum PropertyTypes {
  VILLA = 'Villa',
  APARTMENT = 'Apartment',
  MAISONETTE = 'Maisonette',
  PENTHOUSE = 'Penthouse',
  HOUSE = 'House',
}

export enum LivingTypes {
  KAUFEN = 'Kaufen',
  MIETEN = 'Mieten',
}

export interface Range {
  min: number;
  max: number;
}

export interface HouseLocationsDto {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface HouseResponseDto {
  id: number;
  title: string;
  description: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  bedrooms: number;
  propertyType: PropertyTypes;
  livingType: LivingTypes;
  images: ImagesResponseDto[];
  location: LocationsResponseDto;
}

export interface HousesListResponseDto {
  data: HouseResponseDto[];
  count: number;
  total: number;
}

export interface HousesQueryParams {
  livingType?: LivingTypes;
  propertyType?: PropertyTypes;
  area?: Range;
  rooms?: number;
  price?: Range;
}

export interface ImagesResponseDto {
  imageUrl: string;
  description?: string;
}

export interface LocationsResponseDto {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface GetHousesResponseDto {
  count: number;
  currentPage: number;
  data: HouseResponseDto[];
  limit: number;
  totalCount: number;
}
export interface SearchValuesType {
  param: string
  query: keyof HousesQueryParams
  options: string[]
}
