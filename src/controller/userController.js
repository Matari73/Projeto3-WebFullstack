import user from "../models/User.js";

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


}

export default UserController;