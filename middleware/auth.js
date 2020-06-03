const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

module.exports = {
    authenticate : (req, res, next) => {
        let token = req.get('authorization');
        if(token){
            token = token.slice(7);
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err){
                    return res.json({
                        sucess : 0,
                        message : "Invalid token !"
                    });
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            return res.json({
                success : 0,
                message : "Access denied !"
            });
        }
    }
};