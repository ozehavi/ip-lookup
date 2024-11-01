import { FC } from "react";
import HostInformation from "./HostInformation";
import DomainLookup from "./DomainLookup";

const IpLookup: FC = () => {
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-gray-900">IP Lookup</h1>
      <div className="space-y-8">
        <HostInformation />
        <DomainLookup />
      </div>
    </div>   
  );
};

export default IpLookup;