import { FC, useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { DomainSearch, SEARCH_ACTIONS } from "../../types/searchTypes";
import { HistoryItem } from "./HistoryItem";
import { HistoryListSkeleton } from "../common/Skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ITEMS_PER_PAGE } from "../../constants";

export const SearchHistory: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedPages, setFetchedPages] = useState<Set<number>>(new Set());
  const { state, dispatch } = useSearch();

  useEffect(() => {
    if (!fetchedPages.has(state.currentPage)) {
      fetchHostInfo();
    }
  }, [state.currentPage]);

  const fetchHostInfo = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/history?page=${state.currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      
      if (!response.ok) {
        throw new Error(
          `Could not get history. Please try again later. Status: ${response.status}`
        );
      }
      
      const data = await response.json();
      console.log("data", JSON.stringify(data));    

      dispatch({ 
        type: SEARCH_ACTIONS.FETCH_HISTORY, 
        payload: {
          items: data.items || [],
          currentPage: state.currentPage,
          totalPages: data.totalPages
        }
      });

      setFetchedPages(prev => new Set(prev).add(state.currentPage));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8000/history', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok)
        throw new Error(`Could not clear history. Status: ${response.status}`);

      await response.json();
      dispatch({ type: SEARCH_ACTIONS.CLEAR_HISTORY });
      setFetchedPages(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
      console.error('Error clearing history:', err);
    }
  };

  const navigateToPage = (dir: 'next' | 'prev') => {
    const newPage = dir === 'next' ? state.currentPage + 1 : state.currentPage - 1;
    dispatch({ type: SEARCH_ACTIONS.SET_PAGE, payload: newPage });
  };

  const getCurrentPageItems = (): DomainSearch[] => {
    const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return state.searchHistory
      .slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  if (loading && state.searchHistory.length === 0)
    return <HistoryListSkeleton />;

  if (error)
    return <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>;

  const currentItems = getCurrentPageItems();
    
  return (
    <div className="space-y-2">
      {state.searchHistory.length > 0 && (
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
              Page {state.currentPage} of {state.totalPages}
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
        {loading && <div className="text-gray-500">Loading more items...</div>}
        {currentItems.map((searchItem, index) => (
          <HistoryItem item={searchItem} key={`${searchItem.domain}-${searchItem.timestamp}`} />
        ))}
      </div>
    </div>
  );
};