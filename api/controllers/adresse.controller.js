const Ville = db.villes;
const Region = db.regions;
const Adresse = db.adresses;

exports.findAllRegionsAndVilles = (req, res) => {
  Region.findAll({ include: [{ model: Ville, as: "villes" }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.findRegions = (req, res) => {
  Region.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.findAllCities = (req, res) => {
  Ville.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.findCitiesByRegion = (req, res) => {
  Region.findOne({
    where: { nomRegion: req.params.nomRegion },
  })
    .then((region) => {
      Ville.findAll({ where: { idregion: region._id } })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(400).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.addAdresse = (req, res) => {
  const adresse = {
    adr: req.body.adresse,
    idville: req.body.ville,
  };
  Adresse.create(adresse)
    .then((adresse) => {
      return res.status(200).send({
        id: adresse._id,
        message: "Adresse added succesfully",
      });
    })
    .catch((err) => {
      return res.status(400).send({
        message: err.message,
      });
    });
};
