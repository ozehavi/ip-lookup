import { ITEMS_PER_PAGE } from '../constants';
import { SearchState, SearchAction, SEARCH_ACTIONS } from '../types/searchTypes';

export const initialSearchState: SearchState = {
  currentSearch: null,
  searchHistory: [],
  currentPage: 1,
  totalPages: 0,
};

export const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_CURRENT_SEARCH:
      const newHistory = [action.payload, ...state.searchHistory];
      return { 
        ...state, 
        currentSearch: action.payload,
        searchHistory: newHistory,
        currentPage: 1,
        totalPages: Math.ceil(newHistory.length / ITEMS_PER_PAGE)
      };
    case SEARCH_ACTIONS.CLEAR_SEARCH:
      return { 
        ...state, 
        currentSearch: null
      };
    case SEARCH_ACTIONS.SET_PAGE:
      return { 
        ...state, 
        currentPage: action.payload
      };
    case SEARCH_ACTIONS.FETCH_HISTORY:
      return { 
        ...state, 
        searchHistory: action.payload.items,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case SEARCH_ACTIONS.CLEAR_HISTORY:
      return { 
        ...state, 
        searchHistory: [],
        currentPage: 1,
        totalPages: 0,
      };
    default:
      return state;
  }
};