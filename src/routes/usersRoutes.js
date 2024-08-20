import express from "express";
import UserController from "../controller/userController.js";
import authenticateToken from "../middleware/auth.js";

const routes = express.Router()

routes.post("/user", authenticateToken, UserController.criarUser)
routes.post("/login", UserController.login)

export default routes;