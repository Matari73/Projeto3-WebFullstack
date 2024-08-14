import mongoose from "mongoose";

const personagemSchema = new mongoose.Schema({
    id: { 
        type: mongoose.Schema.Types.ObjectId
    },
    nome: {
        type: String,
        required: true
    },
    altura: {
        type: Number, 
        required: true
    },
    massa: {
        type: Number, 
        required: true
    },
    corCabelo: {
        type: String,
        required: true
    },
    corPele: {
        type: String,
        required: true
    },
      corOlhos: {
        type: String,
        enum: ['azul', 'verde', 'castanhos', 'preto', 'cinza', 'outro'],
        required: true
    },
    genero: {
        type: String,
        enum: ['masculino', 'feminino', 'outro'],
        required: true
    }
}, {versionKey: false})

const personagem = mongoose.model('personagens', personagemSchema);

export default personagem;