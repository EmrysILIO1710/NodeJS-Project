const { Studentbio } = require("../models/studentModel");

const studentAuthController = async (req, res, next) => {
    try {
        const { studentEmail, password } = req.body;
        if(!studentEmail && !password){
            next("BF");//blank field
        }
        const student = await Studentbio.findOne({studentEmail});
        if(student){
          const  check = await student.isCheck(password);
          if(check){
            // console.log(req.headers.authorization);
            const token = req.headers.authorization.split(" ")[1];
            // console.log(token);
            const decode = student.verifyJWT(token);
            // console.log(decode.studentEmail);
            if(decode.studentEmail === studentEmail){
                res.status(200).send(`Authorized personel: \nAgent ${student.studentName}`);
            }
            else{
                next("UE"); //unauthorised entry
            }
          }
          else{
            next("WR"); //wrong password
          }
        }
        else{
            next("ENF"); //email not found
        }
      } catch (err) {
        next(err);
      }
}

module.exports = studentAuthController;