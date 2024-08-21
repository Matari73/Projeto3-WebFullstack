import rateLimit from "express-rate-limit";


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Quantidade limite de requisições excedida.',
    headers: true,
});

export default limiter;