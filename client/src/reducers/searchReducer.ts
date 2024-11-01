import { SearchState, SearchAction } from '../types/searchTypes';

export const initialSearchState: SearchState = {
  currentSearch: null,
  searchHistory: [],
};

export const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_CURRENT_SEARCH':
      return { 
        ...state, 
        currentSearch: action.payload,
        searchHistory: [action.payload, ...state.searchHistory],
      };
    case 'CLEAR_SEARCH':
      return { 
        ...state, 
        currentSearch: null
      };
    case 'FETCH_HISTORY':
        return { 
            ...state, 
            searchHistory: action.payload
        };
    case 'CLEAR_HISTORY':
        return { 
            ...state, 
            searchHistory: []
        };
    default:
      return state;
  }
};