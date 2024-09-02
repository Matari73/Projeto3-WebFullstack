import mongoose from 'mongoose';
import Personagem from '../models/Personagem.js'; 
import User from '../models/User.js'; 
import conectaNaDatabase from '../config/db.js';
import bcrypt from 'bcrypt';

async function senhaComHash(senha){
    const saltRounds = 12;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);
    return hashedSenha
}

const personagens = [
    {
        nome: 'Luke Skywalker',
        altura: 172,
        massa: 77,
        corCabelo: 'loiro',
        corPele: 'branca',
        corOlhos: 'azul',
        genero: 'masculino'
    },
    {
        nome: 'Leia Organa',
        altura: 150,
        massa: 49,
        corCabelo: 'castanho',
        corPele: 'branca',
        corOlhos: 'castanho',
        genero: 'feminino'
    },
    {
        nome: 'Han Solo',
        altura: 180,
        massa: 80,
        corCabelo: 'castanho',
        corPele: 'branca',
        corOlhos: 'castanho',
        genero: 'masculino'
    },
    {
        nome: 'Chewbacca',
        altura: 228,
        massa: 112,
        corCabelo: 'marrom',
        corPele: 'marrom',
        corOlhos: 'preto',
        genero: 'masculino'
    },
    {
        nome: 'Darth Vader',
        altura: 202,
        massa: 136,
        corCabelo: 'preto',
        corPele: 'branca',
        corOlhos: 'vermelho',
        genero: 'masculino'
    },
    {
        nome: 'Obi-Wan Kenobi',
        altura: 182,
        massa: 77,
        corCabelo: 'cinza',
        corPele: 'branca',
        corOlhos: 'azul',
        genero: 'masculino'
    },
    {
        nome: 'R2-D2',
        altura: 96,
        massa: 32,
        corCabelo: 'nenhum',
        corPele: 'branco e azul',
        corOlhos: 'nenhum',
        genero: 'outro'
    },
    {
        nome: 'C-3PO',
        altura: 167,
        massa: 75,
        corCabelo: 'nenhum',
        corPele: 'dourado',
        corOlhos: 'preto',
        genero: 'outro'
    },
    {
        nome: 'Yoda',
        altura: 66,
        massa: 17,
        corCabelo: 'branco',
        corPele: 'verde',
        corOlhos: 'castanho',
        genero: 'masculino'
    },
    {
        nome: 'Boba Fett',
        altura: 183,
        massa: 78,
        corCabelo: 'nenhum',
        corPele: 'verde e vermelho',
        corOlhos: 'verde',
        genero: 'masculino'
    },
    {
        nome: 'Lando Calrissian',
        altura: 183,
        massa: 85,
        corCabelo: 'preto',
        corPele: 'negra',
        corOlhos: 'preto',
        genero: 'masculino'
    },
    {
        nome: 'Wicket W. Warrick',
        altura: 88,
        massa: 25,
        corCabelo: 'marrom',
        corPele: 'marrom',
        corOlhos: 'preto',
        genero: 'masculino'
    }
];

const seedDatabase = async () => {
    try {
        await conectaNaDatabase();
        await Personagem.deleteMany({});
        await User.deleteMany({});

        const usuarios = await Promise.all([
            { nome: 'admin', email: 'admin@starwars.com', senha: await senhaComHash('admin123') },
            { nome: 'user1', email: 'user1@starwars.com', senha: await senhaComHash('user123') },
            { nome: 'user2', email: 'user2@starwars.com', senha: await senhaComHash('user456') }
        ]);

        await Personagem.insertMany(personagens);
        console.log('Personagens adicionados com sucesso!');

        await User.insertMany(usuarios);
        console.log('Usuários adicionados com sucesso!');

        mongoose.connection.close();
    } catch (error) {
        console.error('Erro ao adicionar dados:', error);
        mongoose.connection.close();
    }
};

seedDatabase();