const express = require("express");
const userController = require('../controllers/UserController')

const router = express.Router();

router.get("/user", (req, res) => {
    return res.send("hello from /api/user...");
});

router.post('/register', userController)

module.exports = router;