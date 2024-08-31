import jwt from "jsonwebtoken";
import logger from "../services/logger.js";

const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const token = req.cookies['auth-token'];
    if (!token) {
        logger.info("Token de autenticação ausente.");
        return res.status(401).json({ message: "Acesso negado. Token ausente." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        logger.info("Token verificado com sucesso.", { decoded });
        next();
    } catch (error) {
        logger.error("Token inválido:", { error: error.message });
        res.status(400).json({ message: "Token inválido." });
    }
}

export default authenticateToken;
