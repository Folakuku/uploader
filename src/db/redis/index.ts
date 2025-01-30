import Redis from "ioredis";
import env from "../../config/env";
import logger from "../../config/logger";

const redis = new Redis({
  host: env.redis_host,
  port: env.redis_port,
  password: env.redis_password,
});

redis.on("connect", () => {
  logger.log("Connected to Redis");
});

redis.on("error", (err) => {
  logger.log("Redis connection error");
  logger.logErrorToConsole(err);
});

export default redis;

// import { RedisClientType, createClient } from 'ioredis';
// import env from "../../config/env"
// import  log from '../../config/logger';

// let redisClient: RedisClientType;
// let isReady: boolean;

// export async function createConnection(): Promise<RedisClientType> {
//     if (!isReady) {
//         redisClient = createClient({
//             url: `redis://${env.redis_username}:${env.redis_password}@${env.redis_host}:${Number(env.redis_port)}`,
//         });
//         redisClient.on('error', (err) => log.logger.error(`Redis Error: ${err}`));
//         redisClient.on('connect', () => log.logger.debug('Redis connected'));
//         redisClient.on('reconnecting', () => log.logger.debug('Redis reconnecting'));
//         redisClient.on('ready', () => {
//             isReady = true;
//             log.log('Redis ready!');
//         });
//         await redisClient.connect();
//     }
//     return redisClient;
// }
