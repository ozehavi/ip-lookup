import { FC } from "react";

export const Skeleton: FC = () => {
  
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-100 rounded w-1/3"></div>
      <div className="h-8 bg-gray-100 rounded w-1/2"></div>
    </div>
  );
};

export default Skeleton;