
import { FC, useState } from "react";
import { DomainSearch } from "../../types/types";
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { useSearch } from "../../context/SearchContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SEARCH_ACTIONS } from "../../types/searchTypes";
import { ResultMessage } from "./ResultMessage";

const cleanDomain = (input: string): string => {
    return input.replace(/^(https?:\/\/)?(www\.)?([^\/]+).*/, '$3');
};

const DomainLookup: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [domain, setDomain] = useState<string>("");
    const { state, dispatch } = useSearch();
  
    const searchDomain = (): void => {
        if (!domain.trim()) {
            setError("Please enter a domain name");
            return;
        }
        
        setLoading(true);
        setError(null);
        dispatch({ type: SEARCH_ACTIONS.CLEAR_SEARCH });
        
        const cleanedDomain = cleanDomain(domain);
        const encodedDomain = encodeURIComponent(cleanedDomain);
        
        fetch(`http://localhost:8000/domain/${encodeURIComponent(encodedDomain)}`)
        .then(response => {
            if (!response.ok){
                throw new Error(`Could not get domain information. Please try again later. Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(JSON.stringify(data));
            dispatch({ type: SEARCH_ACTIONS.SET_CURRENT_SEARCH, payload: data });
        })
        .catch(err => {
            setError(err instanceof Error ? err.message : 'Failed to fetch domain information');
            dispatch({ type: SEARCH_ACTIONS.CLEAR_SEARCH });
        })
        .finally(() => setLoading(false));
    };
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-8">
          Domain Lookup
        </h2>
  
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter domain name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
                if(e.key === 'Enter')
                    searchDomain();
            }}
          />
          <button
            onClick={searchDomain}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-70 min-w-[96px] flex items-center justify-center"
          >
            {loading ? <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" /> : 'Lookup'}
          </button>
        </div>
    
        { error ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
            state.currentSearch && <ResultMessage searchResult={state.currentSearch}/>
        )}
      </div>
    );
};

export default DomainLookup;