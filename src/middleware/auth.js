import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ 
            message: "Token não fornecido. Por favor, inclua um token de autenticação no cabeçalho da requisição." 
        });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err){
            return res.status(403).json({
                message: "Token inválido ou expirado. Verifique suas credenciais e tente novamente."
            });
        } 
        req.user = user;
        next();
    });
}

export default authenticateToken;
