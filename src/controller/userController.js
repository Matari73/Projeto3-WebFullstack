import user from "../models/User.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

class UserController {

    static async criarUser(req, res) {
        try {
            const novoUser = await user.create(req.body);
            res.status(201).json({ message: "Criado com sucesso.", user: novoUser });
        } catch (erro) {
            if (erro.name === 'ValidationError') {
                const mensagensErro = Object.values(erro.errors).map(err => err.message);
                res.status(400).json({ message: mensagensErro.join(', ') });
            }
            else if (erro.code === 11000) {
                res.status(409).json({ message: "Email já cadastrado." });
            }
            else {
                res.status(500).json({ message: `${erro.message} - falha ao criar usuário.` });
            }
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        try {
            const userEncontrado = await user.findOne({ email });
            if (!userEncontrado) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const senhaIguais = await userEncontrado.comparePassword(senha);
            if (!senhaIguais) {
                return res.status(401).json({ message: "Senha incorreta." });
            }

            const token = jwt.sign({ id: userEncontrado._id, email: userEncontrado.email }, SECRET_KEY, { expiresIn: '15m' });

            res.status(200).json({
                message: "Login bem-sucedido!",
                user: { email: userEncontrado.email, nome: userEncontrado.nome },
                token
            });
        } catch (error) {
            console.error("Erro durante o login:", error.message);
            res.status(500).json({ message: `${error.message} - falha ao fazer login.` });
        }
    }

}

export default UserController;