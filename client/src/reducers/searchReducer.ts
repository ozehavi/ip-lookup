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
      const newItem = action.payload;
      const updatedHistory = [newItem, ...state.searchHistory];
      return { 
        ...state, 
        currentSearch: newItem,
        searchHistory: updatedHistory,
        currentPage: 1,
        totalPages: Math.ceil(updatedHistory.length / ITEMS_PER_PAGE)
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
      const combinedItems = [...state.searchHistory];
      action.payload.items.forEach(newItem => {
        const exists = combinedItems.some(
          existingItem => 
            existingItem.domain === newItem.domain && 
            existingItem.timestamp === newItem.timestamp
        );
        if (!exists)
          combinedItems.push(newItem);
      });
      return { 
        ...state, 
        searchHistory: combinedItems,
        currentPage: action.payload.currentPage,
        totalPages: Math.max(action.payload.totalPages, 1)
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