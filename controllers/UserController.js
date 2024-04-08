const { Student } = require("../models/userModel");

const userController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { stuID, name, department } = req.body;
    const userStudentID = await Student.findOne({ name: name });
    if (!userStudentID) {
      await Student.create(req.body);
      return res.status(201).send("student added...");
    } 
    else {
      next('UC');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
