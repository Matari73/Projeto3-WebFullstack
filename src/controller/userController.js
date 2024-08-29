import user from "../models/User.js";
import jwt from "jsonwebtoken";
import logger from "../services/logger.js";

const SECRET_KEY = process.env.SECRET_KEY;

class UserController {

    static async criarUser(req, res) {
        try {
            const novoUser = await user.create(req.body);
            logger.info("User criado com sucesso", { user: novoUser });
            res.status(201).json({ message: "Criado com sucesso.", user: novoUser });
        } catch (erro) {
            if (erro.name === "ValidationError") {
                const mensagensErro = Object.values(erro.errors).map(err => err.message);
                logger.error("Erro de validação:", { errors: mensagensErro, originalError: erro.message });
                res.status(400).json({ message: mensagensErro.join(", ") });
            } else if (erro.code === 11000) {
                logger.error("Email já cadastrado.", { error: erro.message });
                res.status(409).json({ message: "Email já cadastrado." });
            } else {
                logger.error("Falha ao criar usuário.", { error: erro.message, stack: erro.stack });
                res.status(500).json({ message: `${erro.message} - falha ao criar usuário.` });
            }
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            logger.error("Email ou senha não inseridos");
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        try {
            const userEncontrado = await user.findOne({ email });
            if (!userEncontrado) {
                logger.error("Usuário não encontrado com o email:", { email });
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const senhaIguais = await userEncontrado.comparePassword(senha);
            if (!senhaIguais) {
                logger.error("Senha incorreta para o email:", { email });
                return res.status(401).json({ message: "Senha incorreta." });
            }

            const token = jwt.sign({ id: userEncontrado._id, email: userEncontrado.email }, SECRET_KEY, { expiresIn: '15m' });
            res.cookie('auth-token', token, { httpOnly: true, secure: false });
            logger.info("Login bem sucedido", { user: { email: userEncontrado.email, nome: userEncontrado.nome } });
            res.status(200).json({
                message: "Login bem sucedido!",
                token
            });
        } catch (error) {
            logger.error("Erro durante o login:", { error: error.message, stack: error.stack });
            res.status(500).json({ message: `${error.message} - falha ao fazer login.` });
        }
    }

}

export default UserController;