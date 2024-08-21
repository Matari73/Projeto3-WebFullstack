import personagem from "../models/Personagem.js";
import cache from "../config/redisClient.js";
import logger from "../services/logger.js";

class PersonagemController {

    static async listarPersonagem(req, res) {
        try {
            const listaPersonagens = await personagem.find({});
            logger.info("Listagem de personagens bem sucedida", { personagens: listaPersonagens.length });
            res.status(200).json(listaPersonagens);
        } catch (erro) {
            logger.error("Falha ao listar personagens", { error: erro.message });
            res.status(500).json({ message: `${erro.message} - falha ao listar personagens` });
        }
    }

    static async buscarPersonagem(req, res) {
        const { nome } = req.body;
        if (!nome) {
            logger.warn("Nome não fornecido para busca.");
            return res.status(400).json({ message: "O nome é obrigatório para a busca." });
        }

        try {
            const personagens = await personagem.find({ nome: new RegExp(nome, 'i') });
            if (personagens.length === 0) {
                logger.info("Nenhum personagem encontrado para o nome:", { nome });
                return res.status(404).json({ message: "Nenhum personagem encontrado." });
            }
            logger.info("Personagens encontrados com sucesso", { nome, quantidade: personagens.length });
            res.status(200).json(personagens);
        } catch (erro) {
            logger.error("Falha ao buscar personagem por nome", { error: erro.message });
            res.status(500).json({ message: `${erro.message} - falha ao buscar personagem por nome.` });
        }
    }

    static async criarPersonagem(req, res) {
        try {
            const novoPersonagem = await personagem.create(req.body);
            cache.del(`/personagem`, (err) => {
                if (err) {
                    logger.error("Erro ao invalidar cache após criar personagem", { error: err.message });
                } else {
                    logger.info("Cache invalidado para /personagem após criar personagem");
                }
            });
            logger.info("Novo personagem criado com sucesso", { personagem: novoPersonagem });
            res.status(200).json({ message: "Criado com sucesso.", personagem: novoPersonagem });
        } catch (erro) {
            if (erro.name === 'ValidationError') {
                logger.error("Erro de validação ao criar personagem", { errors: erro.errors, originalError: erro.message });
                res.status(400).json({ message: erro.message });
            } else {
                logger.error("Falha ao criar personagem", { error: erro.message });
                res.status(500).json({ message: `${erro.message} - falha ao criar personagem.` });
            }
        }
    }

}

export default PersonagemController;