const Users = db.users;

const bcrypt = require("bcrypt");

const config = require("../../config/auth.config.js");

const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
  Users.findAll({ include: [{ model: db.annonces, as: "annonces" }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.create = (req, res) => {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password ||
    !req.body.role
  ) {
    return res.status(400).send({
      message: "Remplissez tous les champs",
    });
  }

  Users.findOne({
    where: { email: req.body.email },
  })
    .then((data) => {
      if (data) {
        return res.status(400).send({
          message: "Un utilisateur avec cet e-mail existe deja",
        });
      } else {
        const salt = bcrypt.genSaltSync(10);

        const user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
          role: req.body.role,
        };

        Users.create(user)
          .then((data) => {
            return res.status(200).send({
              user: data,
              message: "Utilisateur créé avec succès",
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.login = (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Il n'existe aucun compte avec cet email",
        });
      } else {
        const result = bcrypt.compareSync(req.body.password, data.password);
        data.password = undefined;
        if (result) {
          const jsontoken = jwt.sign({ id: data._id }, config.secret, {
            expiresIn: "1h",
          });
          return res.status(200).send({
            message: "Authentifié avec succès",
            user: data,
            token: jsontoken,
          });
        } else {
          return res.status(401).send({
            message: "Mot de passe incorrect",
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

/*exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id, { include: [{ model: db.annonces, as: "annonces" }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};*/

exports.findOne = (req, res) => {
  const id = req.user.id;

  Users.findByPk(id)
    .then((data) => {
      data.password = undefined;
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

exports.adminLogin = (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Il n'existe aucun compte avec cet email",
        });
      } else if (data.role != "Admin") {
        return res.status(401).send({
          message: "Ce compte n'est pas un compte Administrateur",
        });
      } else {
        const result = bcrypt.compareSync(req.body.password, data.password);
        data.password = undefined;
        if (result) {
          const jsontoken = jwt.sign({ id: data._id }, config.secret, {
            expiresIn: "1h",
          });
          return res.status(200).send({
            message: "Authentifié avec succès",
            user: data,
            token: jsontoken,
          });
        } else {
          return res.status(401).send({
            message: "Mot de passe incorrect",
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.updatePassword = (req, res) => {
  Users.findOne({
    where: { email: req.body.email },
  })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Il n'existe aucun compte avec cet email",
        });
      } else {
        console.log(req.body.password);
        const result = bcrypt.compareSync(req.body.password, data.password);

        data.password = undefined;
        console.log(result);
        if (result) {
          const salt = bcrypt.genSaltSync(10);
          const newPassword = bcrypt.hashSync(req.body.newPassword, salt);
          Users.update(
            { password: newPassword },
            {
              where: { _id: req.params.id },
            }
          )
            .then((data) => {
              return res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err,
              });
            });
        } else {
          return res.status(401).send({
            message: "Mot de passe incorrect",
          });
        }
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message,
      });
    });
};

exports.update = (req, res) => {
  Users.update(req.body, {
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
  Users.destroy({
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
