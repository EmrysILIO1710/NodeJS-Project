const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next("Auth-token-blocker");
    } else {
      const token = authHeader.split(" ")[1];

      const validate = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      console.log(validate);
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
