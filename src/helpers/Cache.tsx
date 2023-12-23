import NodeCache from "node-cache";

const cache = new NodeCache();

export default async function Cache<T>(
  cacheKey: string,
  dbQuery: () => Promise<T>
): Promise<{ data: T }> {
  const cachedData = cache.get<T>(cacheKey);

  if (cachedData) {
    console.log("returned from cache");
    return { data: cachedData };
  }

  const dataFromDb = await dbQuery();
  cache.set(cacheKey, dataFromDb);

  console.log("returned from db");

  return { data: dataFromDb };
}

export function CacheDelete(cacheKey: string) {
  cache.del(cacheKey);
}
