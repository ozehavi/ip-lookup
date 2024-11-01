import { FC } from "react";
import HostInformation from "./HostInformation";
import DomainLookup from "./domainLookup/DomainLookup";
import { History } from "./History";
import { SearchProvider } from "../context/SearchContext";

const IpLookup: FC = () => {
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-5 text-gray-900">IP Lookup</h1>
      <div className="space-y-8">
        <SearchProvider>
          <HostInformation />
          <DomainLookup />
          <History />
        </SearchProvider>
      </div>
    </div>
  );
};

export default IpLookup;