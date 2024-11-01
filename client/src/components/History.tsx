import { FC, useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import { format } from "date-fns";
import { SEARCH_ACTIONS } from "../types/searchTypes";

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

  // loader? error?

  return (
    <div className="space-y-2">
      <div className="p-2 flex justify-end">
        <button 
          onClick={()=>{clearHistory()}}
          className="text-sm text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer"
        >
          Clear history
        </button>
      </div>
      <div className="space-y-4">
        {state.searchHistory.reverse().map((search, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
          >
            <div className="min-w-0 max-w-full">
              <p className="font-semibold break-words">Domain: {search.domain}</p>
              {search.ip && <p className="text-gray-600 break-words">IP: {search.ip}</p>}
              <p className="text-gray-500 text-sm">{format(search.timestamp, 'dd/MM/yyyy, hh:mm a')}</p>
            </div>
            <div
              className={`text-sm font-medium ${
                search.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {search.success ? (
                <span className="px-2 py-1 text-sm rounded-md bg-green-100 text-green-800">success</span>
              ) : (
                <span className="px-2 py-1 text-sm rounded-md bg-red-100 text-red-800">failed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ div>
  );
};