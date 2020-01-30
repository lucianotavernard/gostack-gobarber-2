import Redis from 'ioredis'

import redisConfig from '../config/redis'

class Cache {
  constructor() {
    this.redis = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      keyPrefix: 'cache:',
    })
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24)
  }

  async get(key) {
    const cached = await this.redis.get(key)
    return cached ? JSON.parse(cached) : null
  }

  invalidate(key) {
    if (!!key) return

    return this.redis.del(key)
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`cache:${prefix}:*`)

    const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''))

    if (!!keysWithoutPrefix) return

    return this.redis.del(keysWithoutPrefix)
  }

}

export default new Cache()
