import express from "express";
import cookieParser from "cookie-parser";
import personagens from "./personagensRoutes.js";
import users from "./usersRoutes.js";
import limiter from "../middleware/limiter.js";

const routes = (app) => {
    app.use(express.json());
    app.use(limiter);
    app.use(cookieParser());

    app.route("/").get((req, res) => res.status(200).send("Projeto 3 - Back-end"));

    app.use(personagens);
    app.use(users);
};

export default routes;
