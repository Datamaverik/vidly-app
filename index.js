const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging.js")();
require("./startup/route.js")(app);
require("./startup/dataBase.js")();
require("./startup/config.js");
require("./startup/validation.js");

const port = process.env.PORT2 || 3000;
app.listen(port, () => winston.info("Listening on port " + port + "....."));
