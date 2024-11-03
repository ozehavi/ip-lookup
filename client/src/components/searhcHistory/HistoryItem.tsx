import { FC } from "react"
import { format } from "date-fns"
import { DomainSearch } from "../../types/searchTypes"

export const HistoryItem: FC<{ item: DomainSearch  }> = ({ item }) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
      <div className="min-w-0 max-w-full">
          <p className="font-semibold break-words">Domain: {decodeURIComponent(item.domain)}</p>
          {item.ip && <p className="font-semibold break-words">IP: {item.ip}</p>}
          <p className="text-gray-500 text-sm">{format(item.timestamp, 'dd/MM/yyyy, hh:mm a')}</p>
      </div>
      <div
        className={`text-sm font-medium ${
        item.success ? "text-green-600" : "text-red-600"
        }`}
      >
        {item.success ? (
        <span className="px-2 py-1 text-sm rounded-md bg-green-100 text-green-800">success</span>
        ) : (
        <span className="px-2 py-1 text-sm rounded-md bg-red-100 text-red-800">failed</span>
        )}
      </div>
    </div>
  )
}