const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
require("dotenv").config();
require("express-async-errors");
const home = require("./components/home/home");
const readAll = require("./components/read-all/read-all");
const readById = require("./components/read-by-id/read-by-id");
const create = require("./components/create/create");
const update = require("./components/update/update");
const del = require("./components/delete/delete");


(async () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbChar = process.env.DB_CHAR;

  const app = express();
  app.use(express.json());

  const port = process.env.PORT || 3000;
  const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const options = {
    useUnifiedTopology: true,
  };

  console.info("Conectando ao MongoDB Atlas");

  const client = await mongodb.MongoClient.connect(connectionString, options);

  console.info("Conexão estabelecida com o MongoDB Atlas");

  const db = client.db("db_rickymorty");
  const personagens = db.collection("personagens");

  const getPersonagensValidas = () => personagens.find({}).toArray();

  const getPersonagemById = async (id) =>
    personagens.findOne({ _id: ObjectId(id) });

  app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", "*");

    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );

    next();
  });

  app.use("/home", home);

  app.use("/personagens", readAll);
  
  app.use("/:id", readById);

  app.use("/personagens", create);

  app.use("/:id", update);

  app.use("/:id", del);

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
})();
