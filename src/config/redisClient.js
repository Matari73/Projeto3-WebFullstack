import express from "express";
import redisCache from "express-redis-cache";

const cache = redisCache({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    expire: 1800
});

const app = express();

cache.on('connected', () => {
    console.log('Conectado ao Redis para cache');
});

cache.on('disconnected', () => {
    console.log('Desconectado do Redis');
});

export default cache;