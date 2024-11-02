import { FC, useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import { format } from "date-fns";
import { SEARCH_ACTIONS } from "../types/searchTypes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HistoryItem } from "./searhcHistory/HistoryItem";
import { HistoryListSkeleton } from "./common/Skeleton";

export const History: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch } = useSearch();

  useEffect(() => {
    fetchHostInfo();
  }, []);

  const fetchHostInfo = (): void => {    
    fetch('http://localhost:8000/history')
      .then(response => {
        if (!response.ok)
          throw new Error(`Could not get history. Please try again later. Status: ${response.status}`);
        return response.json();
      })
      .then((data: any) => {
        dispatch({ type: SEARCH_ACTIONS.FETCH_HISTORY, payload: data.searches });
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

  if(loading)
    return <HistoryListSkeleton />

  if(error)
    return <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
    
  return (
    <div className="space-y-2">
      <div className="p-2 flex justify-end">
        { state.searchHistory.length > 0 && 
          <button 
            onClick={()=>{clearHistory()}}
            className="text-sm text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer"
          >Clear history</button>
        }
      </div>
      <div className="space-y-4">
        {state.searchHistory.reverse().map((search, index) => (
          <HistoryItem key={index} item={search} />
        ))}
      </div>
    </ div>
  );
};