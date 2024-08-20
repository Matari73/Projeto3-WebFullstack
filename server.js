import fs from "fs";
import https from "https";
import "dotenv/config";
import app from "./src/app.js"; 

const options = {
    key: fs.readFileSync("./src/certificados/server.key"),
    cert: fs.readFileSync("./src/certificados/server.cert")
};

https.createServer(options, app).listen(3001, () => {
    console.log("Servidor HTTPS escutando na porta 3001...");
});