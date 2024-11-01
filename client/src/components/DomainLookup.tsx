import { FC, useState } from "react";
import { DomainInfo } from "../types/types";
import { format } from 'date-fns';
import Skeleton from "./common/Skeleton";
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';

export const ResultMessage: FC<{domainInfo:any  }> = ({ domainInfo }) => {
    console.log("domainInfo", domainInfo)
    const examples = {
        success: {
          domain: 'google.com',
          result: {
            ip: '142.251.33.78',
            status: 'success'
          }
        },
        error: {
          domain: 'nonexistent-domain.xyz',
          result: {
            error: 'Failed to resolve domain. Domain does not exist.',
            status: 'failed'
          }
        }
      };
    // return (
    //     <div className="bg-red-50 border-y border-red-200 p-4">
    //         <div className="flex items-center gap-3">
    //         <FaExclamationCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
    //         <div>
    //             <p className="text-red-800 font-medium">
    //             Domain lookup failed: <span className="font-semibold">{examples.error.domain}</span>
    //             </p>
    //             <p className="text-red-700 mt-1">{examples.error.result.error}</p>
    //         </div>
    //         </div>
    //     </div>
    // )

    return (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <FaCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
                <p className="text-green-800 font-medium">
                    Domain found: <span className="font-semibold">{examples.success.domain}</span>
                </p>
                <p className="text-green-700 mt-1">
                    IP Address: <span className="font-mono">{examples.success.result.ip}</span>
                </p>
            </div>
        </div>
    );
}

const cleanDomain = (input: string): string => {
    return input.replace(/^(https?:\/\/)?(www\.)?/, '');
};

const DomainLookup: FC = () => {
    const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [domain, setDomain] = useState<string>("");
  
    const fetchDomainInfo = (): void => {
        if (!domain.trim()) {
        setError("Please enter a domain name");
        return;
        }
        
        setLoading(true);
        setError(null);

        const cleanedDomain = cleanDomain(domain);
        const encodedDomain = encodeURIComponent(cleanedDomain);
        
        fetch(`http://localhost:8000/domain/${encodeURIComponent(encodedDomain)}`)
        .then(response => {
            if (!response.ok)
            throw new Error(`Could not get domain information. Please try again later. Status: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log(JSON.stringify(data));
            setDomainInfo(data)
        })
        .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch domain information'))
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
            onKeyPress={(e) => e.key === 'Enter' && fetchDomainInfo()}
          />
          <button
            onClick={fetchDomainInfo}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Lookup
          </button>
        </div>
    
        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
          domainInfo && <ResultMessage domainInfo={domainInfo}/>
        )}
      </div>
    );
};

export default DomainLookup;