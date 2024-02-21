const express = require("express");
const router = express.Router();

const task = require("./tasks");

router.use("/task", task);


module.exports = router;
