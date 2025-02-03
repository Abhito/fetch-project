export interface ImageListHeaderProps {
  page: number;
  onPageChange: (page: number) => void;
  count: number;
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (selected: string[]) => void;
  sort: 'asc' | 'desc';
  setSort: (sort: 'asc' | 'desc') => void;
  favorites: string[];
  setFavorites: (list: string[]) => void;
}
