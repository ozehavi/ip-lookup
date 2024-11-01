import { FC, useState } from "react";
import HostInformation from "./HostInformation";
import DomainLookup from "./DomainLookup";
import { History } from "./History";
import { DomainSearch } from "../types/types";

const IpLookup: FC = () => {
  const examples:DomainSearch[] = [{"domain":"fasdfasdfasdf","success":false, timestamp:"1.3.2023"},
    {"domain":"google.com","success":true,"ip":"142.250.75.46", timestamp:"1.3.2023"},
    {"domain":"cccc","success":false, timestamp:"1.3.2023"},
    {"domain":"facebook.com","success":true,"ip":"157.240.196.35", timestamp:"1.3.2023"}
  ]
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-gray-900">IP Lookup</h1>
      <div className="space-y-8">
        <HostInformation />
        <DomainLookup />
        <History searchs={examples} />
      </div>
    </div>
  );
};

export default IpLookup;