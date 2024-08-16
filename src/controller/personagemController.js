import personagem from "../models/Personagem.js";

class PersonagemController {

    static async listarPersonagem(req, res) {
        try {
            const listaPersonagens = await personagem.find({});
            res.status(200).json(listaPersonagens);
        } catch (error) {
            res.status(500).json({ message: `${erro.message} - falha ao listar personagens`});
        }
    }

    static async buscarPersonagem(req, res) {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: "O nome é obrigatório para a busca." });
        }
    
    try {
        const personagens = await personagem.find({ nome: new RegExp(nome, 'i') });
        if (personagens.length === 0) {
            return res.status(404).json({ message: "Nenhum personagem encontrado." });
        }
        res.status(200).json(personagens);
    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha ao buscar personagem por nome.` });
    }
}

    static async criarPersonagem(req, res) {
        try {
            const novoPersonagem = await personagem.create(req.body);
            res.status(200).json({ message: "Criado com sucesso.", personagem: novoPersonagem });
        } catch (erro) {
            if (erro.name === 'ValidationError') {
                res.status(400).json({ message: erro.message });
            } else {
                res.status(500).json({ message: `${erro.message} - falha ao criar personagem.`});
            }
        }
    }

}

export default PersonagemController;