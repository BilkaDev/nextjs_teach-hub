import { Redis } from "@upstash/redis";

import { config } from "@/config";

export const db = new Redis({
  url: config.redisUrl,
  token: config.redisToken
});
