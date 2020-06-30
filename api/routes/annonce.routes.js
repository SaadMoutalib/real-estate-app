module.exports = (app) => {
  const router = require("express").Router();
  const { authenticate } = require("../../middleware/auth");
  const annonces = require("../controllers/annonce.controller");
  const DIR = "./public/";
  const multer = require("multer");
  const { v4: uuidv4 } = require("uuid");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, uuidv4() + "-" + fileName);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
  });

  router.get("/", annonces.findAll);
  router.post("/", authenticate, annonces.create);
  router.get("/:id", annonces.findOne);
  router.post(
    "/upload-images",
    authenticate,
    upload.array("pictures", 12),
    annonces.upload
  );
  router.post("/fonctionalite/", authenticate, annonces.addFonctionalite);
  router.get("/user/:id", annonces.findAllOfUser);
  router.patch("/update/:id", annonces.update);
  router.delete("/delete/:id", annonces.delete);
  router.get("/favoris/:id", authenticate, annonces.getFavoris);
  router.post("/addfavoris", authenticate, annonces.addFavoris);
  router.delete(
    "/deletefavoris/:iduser/:idannonce",
    authenticate,
    annonces.deleteFavoris
  );

  app.use("/api/annonces", router);
};
