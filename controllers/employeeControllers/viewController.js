const { EmployeeData } = require("../../models/employeeAuthModel");

const viewController = async (req, res, next) => {
    try{
        empData = await EmployeeData.find();
        // console.log(empData);
        return res.status(200).send(empData);
    }
    catch (err) {
        next(err);
    }
};

module.exports = viewController;