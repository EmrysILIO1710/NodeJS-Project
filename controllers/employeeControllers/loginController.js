const { EmployeeData } = require("../../models/employeeAuthModel");

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const empData = await EmployeeData.findOne({ email });
    if (empData) {
      const check = await empData.isCheck(password);
      if (check) {
        const jwt = empData.createJWT();
        console.log(jwt);
        return res
          .status(200)
          .send(
            `welcome, ${empData.name} \nToken: ${jwt} \nLogged in as: ${empData.role}`
          );
      } else {
        next("WR"); //wrong password
      }
    } else {
      next("ENF"); //email not found
    }
  } catch (err) {
    next(err);
  }
};

module.exports = loginController;
