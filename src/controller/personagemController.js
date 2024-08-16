import personagem from "../models/Personagem.js";

class PersonagemController {

    static async listarPersonagem(req, res){
        const listaPersonagens = await personagem.find({});
        res.status(200).json(listaPersonagens);
    }

}

export default PersonagemController;