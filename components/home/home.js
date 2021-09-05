const express = require("express");
const router = express.Router();

router.use(function timelog(req, res, next) {
    next();
});

router.get("/", async (req, res) => {
    res.send({ info: "Home Rick and Morty"})
});

module.exports = router;