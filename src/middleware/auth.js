import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const token = req.cookies['auth-token'];
    console.log('Token recebido:', token);
    if (!token) {
        return res.status(401).json({
            message: "Token não fornecido."
        });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Token inválido ou expirado. Verifique suas credenciais e tente novamente."
            });
        }
        req.user = user;
        next();
    });
}

export default authenticateToken;
