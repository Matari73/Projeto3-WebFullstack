import express from "express";
import cookieParser from "cookie-parser";
import personagens from "./personagensRoutes.js";
import users from "./usersRoutes.js";
import limiter from "../middleware/limiter.js";
import logger from "../services/logger.js";
import expressWinston from "express-winston";
import cors from 'cors';

const routes = (app) => {
    app.use(cors({
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST'],
        credentials: true, 
    }));
    app.use(express.json());
    app.use(limiter);
    app.use(cookieParser());
    app.use(personagens);
    app.use(users);
    app.use(expressWinston.logger({
        winstonInstance: logger,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: false,
    }));
    app.use(expressWinston.errorLogger({
        winstonInstance: logger,
        meta: true,
        msg: "Erro {{err.message}}",
        expressFormat: true,
        colorize: false,
    }));

    app.route("/").get((req, res) => res.status(200).send("Projeto 3 - Back-end"));
};

export default routes;
