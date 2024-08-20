import express from "express";
import PersonagemController from "../controller/personagemController.js";
import authenticateToken from "../middleware/auth.js";

const routes = express.Router()

routes.get("/personagem", authenticateToken, PersonagemController.listarPersonagem)
routes.get("/personagem", authenticateToken, PersonagemController.buscarPersonagem)
routes.post("/personagem", authenticateToken, PersonagemController.criarPersonagem)

export default routes;