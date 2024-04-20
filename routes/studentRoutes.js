const express = require("express");
const studentRegisterController = require('../controllers/studentController');
const studentLoginController = require('../controllers/studentLoginController');
const studentAuthController = require('../controllers/studentAuthController');
const router = express.Router();

router.post("/register", studentRegisterController);

router.post('/login', studentLoginController);

router.post('/authorization', studentAuthController);

module.exports = router;