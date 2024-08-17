import express from "express";
import personagens from "./personagensRoutes.js";
import users from "./usersRoutes.js";

const routes = (app) => {
    app.use(express.json());

    app.route("/").get((req, res) => res.status(200).send("Projeto 3 - Back-end"));

    app.use(personagens);
    app.use(users);
};

export default routes;
