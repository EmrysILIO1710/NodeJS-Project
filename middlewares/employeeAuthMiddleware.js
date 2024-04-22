const { EmployeeData } = require("../models/employeeAuthModel");
const jwt = require("jsonwebtoken");

const employeeAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next("Auth-token-blocker");
    } else {
      const token = authHeader.split(" ")[1];

      const validate = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      email = (validate.email);
      const emp = await EmployeeData.findOne({email});
      if(emp.role === 'Admin'){
        next();
      } else {
        next("Auth-token-blocker");
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = employeeAuthMiddleware;
