const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

(async () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbChar = process.env.DB_CHAR;

  const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const options = {
    useUnifiedTopology: true,
  };

  const client = await mongodb.MongoClient.connect(connectionString, options);

  const db = client.db("db_rickymorty");
  const personagens = db.collection("personagens");

  router.use(function (req, res, next) {
    next();
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const quantidadePersonagens = await personagens.countDocuments({
      _id: ObjectId(id),
    });

    if (quantidadePersonagens !== 1) {
      res.status(404).send({ error: "Personagem não encontrado" });
      return;
    }

    const result = await personagens.deleteOne({
      _id: ObjectId(id),
    });

    if (result.deletedCount !== 1) {
      res
        .status(500)
        .send({ error: "Ocorreu um erro ao remover o personagem" });
      return;
    }

    res.send("Personagem removido com sucesso!");
  });
})();

module.exports = router;
