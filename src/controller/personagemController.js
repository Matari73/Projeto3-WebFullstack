import personagem from "../models/Personagem.js";

class PersonagemController {

    static async listarPersonagem(req, res) {
        const listaPersonagens = await personagem.find({});
        res.status(200).json(listaPersonagens);
    }

    static async criarPersonagem(req, res) {
        try {
            const novoPersonagem = await personagem.create(req.body);
            res.status(200).json({ message: "Criado com sucesso", personagem: novoPersonagem });
        } catch (erro) {
            if (erro.name === 'ValidationError') {
                res.status(400).json({ message: erro.message });
            } else {
                res.status(500).json({ message: `${erro.message} - falha ao criar personagem`});
            }
        }
    }

}

export default PersonagemController;