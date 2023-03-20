import { createClient } from "redis";
import util from "util";

const client = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
});

(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));
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
