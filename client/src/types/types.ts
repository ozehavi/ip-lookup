export interface HostInfo {
    internal_ip: string;
    public_ip: string;
    timestamp?: string;
}

export interface DomainSearch {
    domain: string;
    ip?: string;
    timestamp: string;
    success: boolean;
}