const express = require("express");
const profileController = require('../controllers/profileController');

const router = express.Router();

router.post("/view", profileController);

module.exports = router;