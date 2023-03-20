import { createClient } from "redis";
import util from "util";
import dotenv from "dotenv";

dotenv.config();

let client: any;
if (process.env.NODE_ENV === "production") {
  client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT!),
    },
    legacyMode: true,
  });
} else {
  client = createClient({
    url: process.env.REDIS_URL,
    legacyMode: true,
  });
}

(async () => {
  // client.on("error", (err: Error) => console.log("Redis Client Error", err));
  await client.connect();
})();

client.get = util.promisify(client.get).bind(client);
client.del = util.promisify(client.del).bind(client);

export const getRedisAsync = async (key: string) => await client.get(key);
export const setRedisAsync = async (key: string, value: string) =>
  await client.set(key, value);
export const deleteRedisAsync = async (key: string) => {
  await client.del(key);
};
