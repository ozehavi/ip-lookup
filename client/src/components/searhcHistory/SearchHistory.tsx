import { FC, useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { SEARCH_ACTIONS } from "../../types/searchTypes";
import { HistoryItem } from "./HistoryItem";
import { HistoryListSkeleton } from "../common/Skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ITEMS_PER_PAGE } from "../../constants";

export const SearchHistory: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch } = useSearch();

  useEffect(() => {
    fetchHostInfo();
  }, [state.currentPage]);

  const fetchHostInfo = (): void => {
    fetch(`http://localhost:8000/history?page=${state.currentPage}&limit=${ITEMS_PER_PAGE}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Could not get history. Please try again later. Status: ${response.status}`);
      return response.json();
    })
    .then((data: any) => {
      console.log("HISTORY: ", JSON.stringify(data));
      dispatch({ 
        type: SEARCH_ACTIONS.FETCH_HISTORY, 
        payload: {items: data.items, currentPage: state.currentPage, totalPages: data.totalPages}
      });
    })
    .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch history'))
    .finally(() => setLoading(false));
  };

  const clearHistory = (): void => {
    fetch('http://localhost:8000/history', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Could not clear history. Status: ${response.status}`);
      return response.json();
    })
    .then((data: any) => {
      console.log("deleted", JSON.stringify(data));
      dispatch({ type: SEARCH_ACTIONS.CLEAR_HISTORY });
    })
    .catch(err => {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
      console.error('Error clearing history:', err);
    });
  };

  const navigateToPage = (dir: string) => {
    if(dir === 'next')
      dispatch({ type: SEARCH_ACTIONS.SET_PAGE, payload: state.currentPage + 1 });
    else
      dispatch({ type: SEARCH_ACTIONS.SET_PAGE, payload: state.currentPage - 1 });
  }

  if(loading)
    return <HistoryListSkeleton />

  if(error)
    return <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
    
  return (
    <div className="space-y-2">
      {state.totalPages > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateToPage('prev')}
              disabled={state.currentPage === 1}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {state.currentPage} out of {state.totalPages || 1}
            </span>
            <button
              onClick={() => navigateToPage('next')}
              disabled={state.currentPage === state.totalPages || state.totalPages === 0}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          {state.searchHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer"
            >
              Clear history
            </button>
          )}
        </div>
      )}
      <div className="space-y-4">
        {state.searchHistory.reverse().map((searchItem, index) => (
          <HistoryItem item={searchItem} key={index} />
        ))}
      </div>
    </div>
  );  
};