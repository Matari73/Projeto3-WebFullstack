import mongoose from 'mongoose';

const personagemSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome é obrigatório"],
        trim: true
    },
    altura: {
        type: Number,
        required: [true, "A altura é obrigatória"],
        min: [0, "A altura deve ser um valor positivo"]
    },
    massa: {
        type: Number,
        required: [true, "A massa é obrigatória"],
        min: [0, "A massa deve ser um valor positivo"]
    },
    corCabelo: {
        type: String,
        required: [true, "A cor do cabelo é obrigatória"]
    },
    corPele: {
        type: String,
        required: [true, "A cor da pele é obrigatória"]
    },
    corOlhos: {
        type: String,
        required: [true, "A cor dos olhos é obrigatória"]
    },
    genero: {
        type: String,
        enum: ['masculino', 'feminino', 'outro'],
        required: [true, "O gênero é obrigatório"]
    }
},{ collection: 'personagens' });

const Personagem = mongoose.model('Personagem', personagemSchema);

export default Personagem;
