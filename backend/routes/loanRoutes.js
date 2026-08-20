const express = require("express");
const router = express.Router();
const { getLoanBias } = require("../controllers/loanController");

router.get("/bias", getLoanBias);

module.exports = router;
