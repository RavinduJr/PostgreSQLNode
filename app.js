const http = require("http");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const adminCotroller = require("./routes/admin");
const shopController = require("./routes/shop");
const dashboardController = require("./routes/dashboard");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(dashboardController);
app.use(adminCotroller);
app.use(shopController);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

const server = http.createServer(app);

server.listen(3000);
