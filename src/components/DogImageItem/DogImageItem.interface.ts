export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  favorite: boolean;
}

export interface DogSearchInput {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export interface DogSearchResponse {
  next: string;
  resultIds: string[];
  total: number;
  prev?: string;
}

export interface DogImageItemProps {
  dog: Dog;
  onFavorite: (id: string, value: boolean) => void;
  favorites: string[];
  hideIcon?: boolean;
}
