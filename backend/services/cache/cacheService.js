import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 30 });

const get = (key) => cache.get(key);
const set = (key, value) => cache.set(key, value);
const del = (key) => cache.del(key);
const flush = () => cache.flushAll();

export const cacheService = {
	get,
	set,
	del,
	flush,
};
