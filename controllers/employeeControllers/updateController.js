const { EmployeeData } = require("../../models/employeeAuthModel");

const updateController = async (req, res, next) => {
  try {
    if (!req.body.position && !req.body.salary) {
      next("BF"); //blank fields
    } else {
      const email = req.body.email;
      // console.log(email);
      if (req.body.position) {
        const position = req.body.position;
        await EmployeeData.findOneAndUpdate(
          { email: email },
          { position: position }
        );
      }
      if (req.body.salary) {
        const salary = req.body.salary;
        await EmployeeData.findOneAndUpdate(
          { email: email },
          { salary: salary }
        );
      }
      const data = await EmployeeData.findOne({ email });
      return res.status(200).send(`employee data updated... \n${data}`);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = updateController;
