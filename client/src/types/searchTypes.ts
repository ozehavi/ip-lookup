export interface DomainSearch {
  domain: string;
  ip?: string;
  timestamp: string;
  success: boolean;
}

export interface SearchState {
  currentSearch: DomainSearch | null;
  searchHistory: DomainSearch[];
  currentPage: number;
  totalPages: number;
}

interface HistoryList{
  items: DomainSearch[];
  currentPage: number;
  totalPages: number;
}

export const SEARCH_ACTIONS = {
    SET_CURRENT_SEARCH: 'SET_CURRENT_SEARCH',
    CLEAR_SEARCH: 'CLEAR_SEARCH',
    SET_PAGE: 'SET_PAGE',
    FETCH_HISTORY: 'FETCH_HISTORY',
    CLEAR_HISTORY: 'CLEAR_HISTORY'
} as const;

export type SearchAction =
  | { type: 'SET_CURRENT_SEARCH'; payload: DomainSearch }
  | { type: 'CLEAR_SEARCH' }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'FETCH_HISTORY'; payload: HistoryList }
  | { type: 'CLEAR_HISTORY' };

export interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
}