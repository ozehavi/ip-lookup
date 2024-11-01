import { DomainSearch } from './types';

export const SEARCH_ACTIONS = {
    SET_CURRENT_SEARCH: 'SET_CURRENT_SEARCH',
    CLEAR_SEARCH: 'CLEAR_SEARCH'
} as const;

export interface SearchState {
  currentSearch: DomainSearch | null;
  searchHistory: DomainSearch[];
}

export type SearchAction =
  | { type: 'SET_CURRENT_SEARCH'; payload: DomainSearch }
  | { type: 'CLEAR_SEARCH' };

export interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
}