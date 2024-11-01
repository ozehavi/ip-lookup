import { FC } from "react";
import { DomainSearchObject } from "../types/types";

export const History: FC<{ searchs: DomainSearchObject[] }> = ({ searchs }) => (
  <div className="space-y-4">
    {searchs.map((search, index) => (
      <div
        key={index}
        className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center"
      >
        <div>
          <p className="font-semibold">Domain: {search.domain}</p>
          <p className="text-gray-600">IP: {search.ip || "N/A"}</p>
          <p className="text-gray-500 text-sm">
            Timestamp: {new Date(search.timestamp).toLocaleString()}
          </p>
        </div>
        <div
          className={`text-sm font-medium ${
            search.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {search.success ? "Success" : "Failed"}
        </div>
      </div>
    ))}
  </div>
);