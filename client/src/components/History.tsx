import { FC } from "react";
import { DomainSearch } from "../types/types";

export const History: FC<{ searchs: DomainSearch[] }> = ({ searchs }) => (
  <div className="space-y-4">
    {searchs.map((search, index) => (
      <div
        key={index}
        className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
      >
        <div>
          <p className="font-semibold">Domain: {search.domain}</p>
          { search.ip && <p className="text-gray-600">IP: {search.ip}</p>}
          <p className="text-gray-500 text-sm">
            Timestamp: {new Date(search.timestamp).toLocaleString()}
          </p>
        </div>
        <div
          className={`text-sm font-medium ${
            search.success ? "text-green-600" : "text-red-600"
          }`}
        >
            {search.success ? 
                <span className="px-2 py-1 text-sm rounded-md bg-green-100 text-green-800">success</span> :
                <span className="px-2 py-1 text-sm rounded-md bg-red-100 text-red-800">failed</span>
            }
        </div>
      </div>
    ))}
  </div>
);