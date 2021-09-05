const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.get("/personagens", async (req, res) => {
    res.send(await getPersonagensValidas());
});

module.exports = router;