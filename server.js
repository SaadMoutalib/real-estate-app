const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(morgan("dev"));

db.sequelize.sync({
  //force: true,
});

require("./api/routes/user.routes")(app);
require("./api/routes/annonce.routes")(app);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
