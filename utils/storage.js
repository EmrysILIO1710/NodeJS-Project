const multer = require("multer");
const path = require("path"); //built in node module
const fileNameGenerator = require("../utils/fileNameGenerator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //where to store
    return cb(null, path.join(__dirname, "/uploads/")); //null: to catch error, destination
  }, 
  filename: (req, file, cb) => {
    return cb(
      null,
      fileNameGenerator(file.originalname, "U-654987AX", Date.now())
    );
  },
});

const upload = multer({storage});

module.exports = upload;
