const { EmployeeData } = require("../../models/employeeAuthModel");

const addController = async (req, res, next) => {
    try{
        const {name, email, position, role, salary, password} = req.body;
        const emp = await EmployeeData.findOne({email});
        if(!emp){
            const empData = await EmployeeData.create(req.body);
            const jwt = empData.createJWT();
            console.log(jwt);
            return res.status(201).send("new employee data added...");
        }
        else{
            next("UC");
        }
    }
    catch (err) {
        next(err);
    }
};

module.exports = addController;