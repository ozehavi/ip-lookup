export interface HostInfo {
    internal_ip: string;
    public_ip: string;
    timestamp?: string;
}

export interface DomainSearchObject {
    domain: string;
    ip?: string;
    timestamp: string;
    success: boolean;
}