import { Redis  } from 'ioredis'

function getRedisUrl(){
    const redisURL = process.env.REDIS_URL
    if(redisURL){
        return redisURL
    } else {
        throw new Error("could not find redis url")
    }
}

export const redis = new Redis(getRedisUrl())