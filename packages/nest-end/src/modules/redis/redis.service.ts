import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;
  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      port: this.configService.get('REDIS_PORT'), // Redis 服务器的端口
      host: this.configService.get('REDIS_HOST'), // Redis 服务器的主机名
      password: this.configService.get('REDIS_PASSWORD'),
    });
  }

  async setValue(key: string, value: string, time: number = 2) {
    value = JSON.stringify(value);
    const newTime = time * 60 * 60 * 24;
    if (!newTime) {
      await this.redisClient.set(key, value);
    } else {
      await this.redisClient.set(key, value, 'EX', newTime);
    }
  }

  /**
   * @description: 获取 redis 缓存
   * @param {string} key
   */
  getValue(key: string) {
    return this.redisClient.get(key);
  }

  setWithExpiry(key: string, value: string, time: number) {
    return this.redisClient.setex(key, time, value);
  }

  async getAllKeys(pattern: string) {
    const keys = await this.redisClient.keys(pattern);
    return keys;
  }

  /**
   * @description: 删除 redis 缓存
   * @param {string} key
   */
  delValue(key: string) {
    return this.redisClient.del(key);
  }

  async setHashField(key: string, field: string, value: string) {
    return this.redisClient.hset(key, field, value);
  }

  getHashField(key: string, field: string) {
    return this.redisClient.hget(key, field);
  }

  getAllHashFields(key: string) {
    return this.redisClient.hgetall(key);
  }

  /**
   * @description: 清空 redis 缓存
   */
  async cacheFlushall(): Promise<void> {
    await this.redisClient.flushall();
  }
}
