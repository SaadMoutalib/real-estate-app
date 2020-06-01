const Annonce = db.annonces;

exports.findAll = (req ,res) => {
    Annonce.findAll({ include:[{model : db.users, as : 'user'}] }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message
        });
    });
}

exports.create = (req, res) => {
    if(!req.body.titre || !req.body.userid || !req.body.tel || !req.body.description){
        return res.json({
            success : 0,
            message : "No field should be empty !"
        });
    }

    const annonce = {
        titre: req.body.titre,
        prix: req.body.prix,
        tel: req.body.tel,
        description: req.body.description,
        userid : req.body.userid
    };

    Annonce.create(annonce).then(data => {
        return res.json({
            success : 1,
            message : "Annonce created successfuly",
            annonce : data
        });
    }).catch(err =>{
        res.status(500).send({
            message : err.message
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Annonce.findByPk(id, { include:[{ model : db.users, as: 'user'}] })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving annonce with id=" + id
        });
    });
};