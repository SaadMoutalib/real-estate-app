module.exports = app => {
    const router = require("express").Router();
    const { authenticate } = require("../../middleware/auth"); 
    const annonces = require('../controllers/annonce.controller');

    router.get("/",annonces.findAll);
    router.post("/",authenticate,annonces.create);
    router.get("/:id", annonces.findOne);

    app.use('/api/annonces',router);
};