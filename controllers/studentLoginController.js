const { Studentbio } = require("../models/studentModel");
const bcrypt = require('bcrypt');

const studentLoginController = async (req, res, next) => {
  try {
    const { studentEmail, password } = req.body;
    if(!studentEmail && !password){
        next("BF");//blank field
    }
    const student = await Studentbio.findOne({studentEmail});
    if(student){
      const  check = await student.isCheck(password);
      if(check){
        const jwt = student.createJWT();
        console.log(jwt);
        return res.status(200).send(`welcome, ${student.studentName} \nToken: ${jwt}`);
      }
      else{
        next("WR"); //wrong password
      }
        // const hash = student.password;
        // bcrypt.compare(password, hash, function(err, result) {
        //     if(result){
        //         return res.status(200).send(`welcome, ${student.studentName}`);
        //     }
        //     else{
        //         next("WR"); //wrong password
        //     }
        // });
    }
    else{
        next("ENF"); //email not found
    }
  } catch (err) {
    next(err);
  }
};

module.exports = studentLoginController;
