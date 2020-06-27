module.exports = (app) => {
  const router = require("express").Router();
  const adresses = require("../controllers/adresse.controller");
  const { authenticate } = require("../../middleware/auth");

  router.get("/locations", adresses.findAllRegionsAndVilles);
  router.get("/regions", adresses.findRegions);
  router.get("/cities/:nomRegion", adresses.findCitiesByRegion);
  router.get("/cities", adresses.findAllCities);
  router.post("/", authenticate, adresses.addAdresse);

  app.use("/api/adresses", router);
};
