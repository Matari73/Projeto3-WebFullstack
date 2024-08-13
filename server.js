import http from 'http';

const PORT = 3000;

const rotas = {
    "/": "Projeto 3 - Back-end",
    "/personagem": "Rota de personagem",
    "/login": "Rota de Login"
};

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(rotas[req.url]);
})

server.listen(PORT, () => {
    console.log("Servidor escutando...")
})