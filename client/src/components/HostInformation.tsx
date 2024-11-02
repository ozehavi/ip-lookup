import { FC, useEffect, useState } from "react";
import { HostInfo } from "../types/types";
import { format } from 'date-fns';
import Skeleton from "./common/Skeleton";
import { InfoField } from "./common/InfoField";

const HostInformation: FC = () => {
  const [hostInfo, setHostInfo] = useState<HostInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHostInfo();
  }, []);

  const fetchHostInfo = (): void => {    
    fetch('http://localhost:8000/host')
      .then(response => {
        if (!response.ok)
          throw new Error(`Could not get host information. Please try again later. Status: ${response.status}`);
        return response.json();
      })
      .then((data: HostInfo) => setHostInfo({...data,timestamp: format(new Date(), 'dd/MM/yyyy, hh:mm a')}))
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to fetch host information'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-8">
        Host Information
      </h2>
  
      { loading ? (
        <Skeleton />
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      ) : (
        hostInfo && (
          <div className="grid md:grid-cols-2 gap-8">
            <InfoField label="Internal IP" value={hostInfo.internal_ip} />
            <InfoField label="Public IP" value={hostInfo.public_ip} />
            <div className="md:col-span-2 text-sm text-gray-500">Last Updated: {hostInfo.timestamp}</div>
          </div>
        )
      )}
    </div>
  );
};

export default HostInformation;