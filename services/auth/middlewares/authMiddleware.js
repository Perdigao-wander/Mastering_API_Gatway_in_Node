const {verify} = require("jsonwebtoken");
const JWT_SECRET = "17d1c04d81a10b8c327535a4da0e0ebebef0a6efddef7f405d15af21c35ecac6";

exports.authenticate = (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(" ")[1];

        const payload = verify(token, JWT_SECRET);
        if (payload.id) {
            req.user = payload
            next();
        }
    }catch (e) {
        next(e);
    }
}