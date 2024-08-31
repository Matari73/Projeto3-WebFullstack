import personagem from "../models/Personagem.js";
import cache from "../config/redisClient.js";
import logger from "../services/logger.js";
import jwt from "jsonwebtoken";

const CACHE_KEY_PERSONAGEM_LIST = 'personagem_list';

class PersonagemController {

    static async listarPersonagens(req, res) {
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
            logger.info("Iniciando a criação de personagem.", { cookies: req.cookies });
            const novoPersonagem = await personagem.create(req.body);
            cache.del(CACHE_KEY_PERSONAGEM_LIST, (err) => {
                if (err) {
                    logger.error("Erro ao invalidar cache após criar personagem", { error: err.message });
                } else {
                    logger.info("Cache invalidado para 'personagem_list' após criar personagem");
                }
            });

            logger.info("Novo personagem criado com sucesso", { personagem: novoPersonagem });
            const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.SECRET_KEY, { expiresIn: '15m' });
            res.cookie('auth-token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'None', maxAge: 15 * 60 * 1000 });
            res.status(201).json({ message: "Personagem criado com sucesso.", personagem: novoPersonagem, token: token });
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