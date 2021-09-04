const express = require("express");
const router = express.router();

router.use(function timelog (req, res, next){
    console.log("Time: ", Date.now());
});

router.get("/", async (req, res) => {
    res.send({ info: "Home Rick and Morty"})
});

module.exports = router;