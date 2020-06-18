var jwt = require('jsonwebtoken');
//=============================
// verificar token
//=============================
let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    "name": "JsonWebTokenError",
                    "message": "token no valido"
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
//=============================
// verificar admin role
//=============================
let verificaRol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                "name": "login",
                "message": "usuario no administrador"
            }
        });
    }
};
// =====================
// Verifica token para imagen
// =====================
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
//
module.exports = {
    verificaToken,
    verificaRol,
    verificaTokenImg
}