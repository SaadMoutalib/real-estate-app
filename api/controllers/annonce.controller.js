const db = require("../../config/db");
const { Op } = require("sequelize");

const Annonce = db.annonces;
const Photos = db.photos;
const Fonctionalites = db.fonctionalites;
const Favoris = db.favoris;

exports.upload = (req, res) => {
  const images = [];
  var error = null;
  const url = req.protocol + "://" + req.get("host");

  for (var i = 0; i < req.files.length; i++) {
    images.push(url + "/public/" + req.files[i].filename);
    const photo = {
      url: url + "/public/" + req.files[i].filename,
      name: req.files[i].filename,
      annonceid: req.body.idannonce,
    };

    Photos.create(photo)
      .then((data) => {
        res.status(200).send({
          message: "Photo ajouter avec succes",
          photo: data,
        });
      })
      .catch((err) => {
        error = err;
      });
    if (error) {
      res.status(500).send({
        message: "Error in photos " + i + " : " + error.message,
      });
    }
  }
};

exports.findAll = (req, res) => {
  var filter = { where: {} };
  if (req.query.status) {
    filter.where.status = { [Op.eq]: req.query.status };
  }
  if (req.query.type) {
    filter.where.type = { [Op.eq]: req.query.type };
  }
  if (req.query.prixMax && req.query.prixMin) {
    filter.where.prix = {
      [Op.and]: [
        { [Op.gte]: req.query.prixMin },
        { [Op.lte]: req.query.prixMax },
      ],
    };
  }
  if (req.query.surfaceMin && req.query.surfaceMax) {
    filter.where.surface = {
      [Op.and]: [
        { [Op.gte]: req.query.surfaceMin },
        { [Op.lte]: req.query.surfaceMax },
      ],
    };
  }
  if (req.query.nbrChambres) {
    filter.where.nbrChambres = { [Op.gte]: req.query.nbrChambres };
  }
  if (req.query.nbrSallesDeBain) {
    filter.where.nbrSallesDeBain = { [Op.gte]: req.query.nbrSallesDeBain };
  }
  if (req.query.nbrPieces) {
    filter.where.nbrPieces = { [Op.gte]: req.query.nbrPieces };
  }

  var villeFilter = {};
  if (req.query.ville) {
    villeFilter = { nomVille: { [Op.like]: "%" + req.query.ville + "%" } };
  }

  filter.include = [
    { model: db.photos, as: "photos" },
    {
      model: db.adresses,
      as: "adresse",
      required: true,
      include: {
        model: db.villes,
        as: "ville",
        where: villeFilter,
        include: {
          model: db.regions,
          as: "region",
        },
      },
    },
  ];
  console.log(filter);

  console.log(filter + "\n" + villeFilter);
  Annonce.findAll(filter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAllOfUser = (req, res) => {
  var filter = { where: { userid: req.params.id } };

  if (req.query.filter) {
    filter.where.status = { [Op.eq]: req.query.filter };
  }

  filter.include = [
    { model: db.photos, as: "photos" },
    {
      model: db.adresses,
      as: "adresse",
      required: true,
      include: {
        model: db.villes,
        as: "ville",
        include: {
          model: db.regions,
          as: "region",
        },
      },
    },
  ];

  Annonce.findAll(filter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getFavoris = (req, res) => {
  Favoris.findAll({
    where: { usersModelId: req.params.id },
    include: [
      {
        model: Annonce,
        include: [
          { model: db.photos, as: "photos" },
          {
            model: db.adresses,
            as: "adresse",
            required: true,
            include: {
              model: db.villes,
              as: "ville",
              include: {
                model: db.regions,
                as: "region",
              },
            },
          },
        ],
      },
    ],
    attributes: ["annoncesModelId"],
  })
    .then((data) => {
      res.status(200).send({ favoris: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getMesFavoris = (req, res) => {
  Favoris.findAll({
    where: { usersModelId: req.params.iduser },
    include: [{ model: db.annonces, as: "annonce" }],
  });
};

exports.deleteFavoris = (req, res) => {
  Favoris.destroy({
    where: {
      annoncesModelId: req.params.idannonce,
      usersModelId: req.params.iduser,
    },
  })
    .then((data) => {
      Annonce.increment("favoris", {
        by: -1,
        where: { _id: req.params.idannonce },
      })
        .then((result) => {
          return res.status(200).send({
            message: "Annonce favoris decremented",
            favoris: result.favoris,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err,
      });
    });
};

exports.addFavoris = (req, res) => {
  Favoris.create({
    usersModelId: req.body.iduser,
    annoncesModelId: req.body.idannonce,
  })
    .then((data) => {
      Annonce.increment("favoris", {
        by: 1,
        where: { _id: req.body.idannonce },
      })
        .then((result) => {
          return res.status(200).send({
            message: "Annonce favoris incremented",
            favoris: result.favoris,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

exports.create = (req, res) => {
  if (
    !req.body.titre ||
    !req.body.userid ||
    !req.body.tel ||
    !req.body.description ||
    !req.body.etat ||
    !req.body.type ||
    !req.body.idadresse ||
    !req.body.idfonctionalite
  ) {
    return res.status(400).send({
      message: "No field should be empty !",
    });
  }

  const annonce = {
    titre: req.body.titre,
    prix: req.body.prix,
    tel: req.body.tel,
    surface: req.body.surface,
    nbrChambres: req.body.nbrChambres,
    nbrPieces: req.body.nbrPieces,
    nbrSallesDeBain: req.body.nbrSallesDeBain,
    description: req.body.description,
    type: req.body.type,
    etat: req.body.etat,
    userid: req.body.userid,
    idadresse: req.body.idadresse,
    idfonctionalite: req.body.idfonctionalite,
  };

  Annonce.create(annonce)
    .then((data) => {
      return res.status(200).send({
        success: 1,
        message: "Annonce created successfuly",
        annonce: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.addFonctionalite = (req, res) => {
  Fonctionalites.create(req.body)
    .then((data) => {
      return res.status(200).send({
        message: "Fonctionalite added succesfully",
        id: data._id,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Annonce.findByPk(id, {
    include: [
      { model: db.photos, as: "photos" },
      { model: db.fonctionalites, as: "fonctionalite" },
      {
        model: db.users,
        as: "user",
        attributes: ["email", "firstname", "lastname"],
      },
      {
        model: db.adresses,
        as: "adresse",
        include: {
          model: db.villes,
          as: "ville",
          include: {
            model: db.regions,
            as: "region",
          },
        },
      },
    ],
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving annonce with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  Annonce.update(req.body, {
    where: { _id: req.params.id },
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.delete = (req, res) => {
  Annonce.destroy({
    where: {
      _id: req.params.id,
    },
    truncate: false,
  })
    .then((data) => {
      res.status(200).send({
        message: "deleted succesfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};
