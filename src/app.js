import express from "express";
import conectaNaDatabase from "./config/db.js";
import personagem from "./models/Personagem.js"

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexao com o banco feita com sucesso!")
})

const app = express();
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("Projeto 3 - Back-end");
})

app.get("/personagem", async(req, res) => {
    const listaPersonagens = await personagem.find({});
    res.status(200).json(listaPersonagens);
})

// app.post("/personagem", (req, res) => {
//     personagens.push(req.body);
//     res.status(201).send("Personagem criado com sucesso!");
// })

export default app;
