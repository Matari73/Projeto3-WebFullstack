import app from "./src/app.js"
import "dotenv/config"

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor escutando...")
})