const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentBioSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  studentContact: {
    type: String,
    required: true,
  },
  studentDepartment: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//encrypting password
studentBioSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//checking password
studentBioSchema.methods.isCheck = async function (password) {
  const check = await bcrypt.compare(password, this.password);
  return check;
};

//creating json web token (jwt)
studentBioSchema.methods.createJWT = function () {
  const token = jwt.sign(
    {
      studentEmail: this.studentEmail,
      // exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_PRIVATE_KEY,
    // { algorithm: "RS256" }
  );
  return token;
};

//verifying jwt
studentBioSchema.methods.verifyJWT = function (token) {
  const verify = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  return verify;
}

const Studentbio = mongoose.model("studentBio", studentBioSchema);

module.exports = { Studentbio };
