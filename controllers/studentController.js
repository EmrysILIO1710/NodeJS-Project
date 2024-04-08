const { Studentbio } = require("../models/studentModel");

const studentController = async (req, res, next) => {
  try {
    const { studentName, studentEmail, studentContact, studentDepartment, password } = req.body;
    if(!studentEmail && !studentName && !password){
        next("BF");//blank field
    }
    const student = await Studentbio.findOne({studentEmail});
    if(!student){
        await Studentbio.create(req.body);
        const jwt = student.createJWT();
        console.log(jwt);
        return res.status(201).send("student added...");
    }
    else{
        next("UC");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = studentController;
