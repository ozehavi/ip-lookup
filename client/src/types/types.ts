export interface HostInfo {
    internal_ip: string;
    public_ip: string;
    timestamp?: string;
}

export interface DomainInfo {
    domain: string;
    ip_address: string;
    timestamp: string;
}