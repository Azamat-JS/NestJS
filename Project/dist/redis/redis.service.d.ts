export declare class RedisService {
    private client;
    constructor();
    set(key: string, value: string, ttl: number): Promise<void>;
    get(key: string): Promise<string | null>;
}
