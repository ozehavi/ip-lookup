import { FC } from "react"
import { FaCheck, FaExclamationCircle } from "react-icons/fa"
import { DomainSearch } from "../../types/types"

const ValidDomain: FC<{ searchResult: DomainSearch  }> = ({ searchResult }) => {  
    
    return (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <FaCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
                <p className="text-green-800 font-medium">
                    Domain found: <span className="font-semibold">{searchResult.domain}</span>
                </p>
                <p className="text-green-700 mt-1 font-medium">
                    IP Address: <span className="font-semibold">{searchResult.ip}</span>
                </p>
            </div>
        </div>
    )
}

const InvalidDomain: FC<{ searchResult: DomainSearch  }> = ({ searchResult }) => {  
    
    return (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3">
            <FaExclamationCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div>
                <p className="text-red-800 font-medium">
                Domain lookup failed: <span className="font-semibold">{searchResult.domain}</span>
                </p>
                <p className="text-red-700 mt-1">{}</p>
            </div>
            </div>
        </div>
    )
}

export const ResultMessage: FC<{ searchResult: DomainSearch  }> = ({ searchResult }) => {
    return searchResult.success ? (
        <ValidDomain searchResult={searchResult} />
    ) : (
        <InvalidDomain searchResult={searchResult} />
    );
}