import express from "express";
import conectaNaDatabase from "./config/db.js";

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

export default app;
