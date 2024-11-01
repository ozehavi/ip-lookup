import { FC } from "react"

export const InfoField: FC<{label: string, value: string}> = ({ label, value }) => (
    <div>
      <div className="text-gray-500 text-lg mb-2">
        {label}
      </div>
      <div className="text-2xl font-mono">
        {value}
      </div>
    </div>
);