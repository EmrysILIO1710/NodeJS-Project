const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const employeeAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  position: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//encrypting password
employeeAuthSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  //checking password
  employeeAuthSchema.methods.isCheck = async function (password) {
    const check = await bcrypt.compare(password, this.password);
    return check;
  };

//creating json web token (jwt)
employeeAuthSchema.methods.createJWT = function () {
  const token = jwt.sign(
    {
        email: this.email,
      // exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_PRIVATE_KEY
    // { algorithm: "RS256" }
  );
  return token;
};

//verifying jwt
employeeAuthSchema.methods.verifyJWT = function (token) {
  const verify = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  return verify;
};

const EmployeeData = mongoose.model("employeeAuth", employeeAuthSchema);

module.exports = { EmployeeData };
