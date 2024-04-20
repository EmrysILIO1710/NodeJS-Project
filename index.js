const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoDB = require("./config/conn");
const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRoutes");
const studentRouter = require('./routes/studentRoutes');
const userMiddleware = require('./middlewares/userMiddlewares');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));

mongoDB.mongoDBConnection();

//for each route, we will create Router files
app.use('/api', userRouter);
app.use('/student', studentRouter);
app.use('/profile', authMiddleware, profileRouter);

//middlewares
app.use(userMiddleware);

app.listen(port,  () => {
    console.log(`listening at port ${port}...`);
})