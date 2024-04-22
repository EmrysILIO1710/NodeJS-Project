const express = require("express");
const viewController = require('../controllers/employeeControllers/viewController');
const addController = require('../controllers/employeeControllers/addController');
const updateController = require('../controllers/employeeControllers/updateController');
const loginController = require('../controllers/employeeControllers/loginController');
const employeeAuthMiddleware = require('../middlewares/employeeAuthMiddleware');

const router = express.Router();

router.post("/add", addController);
router.get("/view", viewController);
router.post("/login", loginController);
router.put("/update", employeeAuthMiddleware, updateController);

module.exports = router;