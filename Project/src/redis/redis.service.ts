import { Injectable } from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class RedisService {
  private client;
  constructor() {
    this.client = createClient({
      username: "default",
      password: "9cNy7hWp8dp9XfBEXUeBxpYjrNHqPtPg",
      socket: {
        host: "redis-19047.c14.us-east-1-3.ec2.redns.redis-cloud.com",
        port: 19047,
      },
    });
    this.client.on("error", (err) => {
      console.log(`Redis error: ${err}`);
    });
    this.client.connect();
    console.log("Redis connected");
  }

  async set(key: string, value: string, ttl: number) {
    await this.client.set(key, value);
    if (ttl) {
      await this.client.expire(key, ttl);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}