const Users = db.users;

const bcrypt = require('bcrypt');

const config = require("../../config/auth.config.js");

const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
    Users.findAll({ include:[{ model : db.annonces, as: 'annonces'}] }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        });
    });
};

exports.create = (req, res) => {
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.role){
        return res.json({
            success : 0,
            message : "No field should be empty !"
        });
    }

    Users.findOne({
        where : {email : req.body.email}
    }).then(data => {
        if(data){
            return res.json({
                success : 0,
                message : "A user with that email already exists !"
            });
        }else{
            const salt = bcrypt.genSaltSync(10);

            const user = {
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, salt),
                role : req.body.role
            };

            Users.create(user).then(data => {
                return res.json({
                    success : 1,
                    user : data,
                    message : "User created successfuly"
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            }); 
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

    
};

exports.login = (req, res) =>{
    Users.findOne({
        where : {email : req.body.email}
    }).then(data => {
        if(!data){
            return res.status(404).send({
                success : 0, 
                message : "Il n'existe aucun compte avec cet email"
            });
        }else{
            const result = bcrypt.compareSync(req.body.password, data.password);
            data.password = undefined;
            if(result) {
                const jsontoken = jwt.sign({data : data}, config.secret, {expiresIn: "1h" });
                return res.json({
                    success : 1,
                    message : "Login successfull",
                    id: data.idusers,
                    email : data.email,
                    firstname : data.firstname,
                    lastname : data.lastname,
                    role : data.role,
                    token : jsontoken
                });
            }else{
                return res.status(404).send({
                    success : 0, 
                    message : "Mot de passe incorrect"
                });
            }
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findByPk(id, { include:[{ model : db.annonces, as: 'annonces'}] })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving user with id=" + id
        });
    });
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};