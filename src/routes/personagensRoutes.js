import express from "express";
import PersonagemController from "../controller/personagemController.js";
import authenticateToken from "../middleware/auth.js";
import cache from "../config/redisClient.js";

const routes = express.Router()

routes.get("/personagem", authenticateToken,cache.route(), PersonagemController.listarPersonagens)
routes.get("/personagem", authenticateToken, cache.route(), PersonagemController.buscarPersonagem)
routes.post("/personagem", authenticateToken, PersonagemController.criarPersonagem)

export default routes;