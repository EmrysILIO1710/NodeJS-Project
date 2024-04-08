const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoDB = require("./config/conn");
const userRouter = require("./routes/userRoutes");
const studentRouter = require('./routes/studentRoutes');
const userMiddleware = require('./middlewares/userMiddlewares');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));

mongoDB.mongoDBConnection();

//for each route, we will create Router files
app.use('/student', studentRouter);
app.use('/api', userRouter);
app.use(userMiddleware);

app.listen(port,  () => {
    console.log(`listening at port ${port}...`);
})