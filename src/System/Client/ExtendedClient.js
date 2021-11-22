const http = require('http');
const { logger } = require('../../Extended/Logger');
require('dotenv').config();
var express = require('express');
var app = express();

app.set("view engine", "ejs")
app.get("/", function (req, res) {
    res.render("index")
});

app.use(express.static("views/"))

app.get('*', function(req, res){
  res.render("404")
});
app.listen(process.env.PORT);

const Replit = (process.env.REPLIT_DB_URL !== undefined);
function initialize(replit = false) {
 if (replit) {
    logger.info('[REPLIT HOST] [STARTING WEBSERVER]');
    return require('../Core/YurikaExtended');
  } return require('../Core/YurikaExtended');
}
initialize(Replit);
