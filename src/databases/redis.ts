import * as redis from 'redis'

class Redis {
  private url: string;
  private client: redis.RedisClientType;
  constructor() {
    this.url = process.env.REDIS_URL || 'redis://localhost:6379';
    this.client = null;
  }

  async getClient() {
    if (this.client && this.client.isOpen) return this.client;
    else {     
      this.client = redis.createClient({
        url: this.url,
      });
      await this.client.connect();
      return this.client;
    }
  }

  public async set(key: string, value: string): Promise<void> {
    const client = await this.getClient();
    await client.set(key, value);
  }

  public async get(key: string): Promise<string> {
    const client = await this.getClient();
    return await client.get(key);
  }
}

export const redisClient = new Redis();
