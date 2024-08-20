import express from "express";
import UserController from "../controller/userController.js";

const routes = express.Router()

routes.post("/user", UserController.criarUser)
routes.post("/login", UserController.login)

export default routes;