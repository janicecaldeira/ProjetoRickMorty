const express = require("express");
require("dotenv").config();
require("express-async-errors");
var cors = require("cors");
//Requires para todos os endpoints
const home = require("./components/home/home");
const readAll = require("./components/read-all/read-all");
const readById = require("./components/read-by-id/read-by-id");
const create = require("./components/create/create");
const update = require("./components/update/update");
const del = require("./components/delete/delete");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors());

//Usando as rotas criadas em arquivos separados
app.use("/home", home);
app.use("/personagens/all", readAll);
app.use("/personagens/single", readById);
app.use("/personagens/create", create);
app.use("/personagens/update", update);
app.use("/personagens/delete", del);

//Validação e tratamento de erros
app.all("*", function (req, res) {
  res.status(404).send({ message: "Endpoint was not found" });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}/home`);
});
