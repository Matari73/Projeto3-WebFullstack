import express from "express";
import PersonagemController from "../controller/personagemController.js";

const routes = express.Router()

routes.get("/personagem", PersonagemController.listarPersonagem)
routes.post("/personagem", PersonagemController.criarPersonagem)

export default routes;