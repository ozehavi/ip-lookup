export const HistoryListSkeleton = () => {
  // Generate 3 skeleton items by default
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center animate-pulse">
          {/* Left side content */}
          <div className="min-w-0 max-w-full space-y-2">
            {/* Domain */}
            <div className="h-5 bg-gray-200 rounded w-48"></div>
            {/* IP */}
            <div className="h-5 bg-gray-200 rounded w-36"></div>
            {/* Timestamp */}
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>

          {/* Status badge */}
          <div className="flex-shrink-0">
            <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="p-3 bg-white rounded-lg w-full max-w-2xl">
      {/* IP Addresses Container - Side by Side */}
      <div className="flex justify-between">
        {/* Internal IP Section */}
        <div className="space-y-1.5 animate-pulse">
          <div className="h-5 bg-gray-100 rounded w-24 text-gray-500"></div>
          <div className="h-7 bg-gray-100 rounded w-36"></div>
        </div>

        {/* Public IP Section */}
        <div className="space-y-1.5 animate-pulse">
          <div className="h-5 bg-gray-100 rounded w-24"></div>
          <div className="h-7 bg-gray-100 rounded w-44"></div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="animate-pulse mt-6">
        <div className="h-4 bg-gray-100 rounded w-56"></div>
      </div>
    </div>
  );
};

export default Skeleton;