 const express=require('express')
 const morgan=require('morgan')
 const dotenv=require('dotenv')
 const cors=require('cors')
const bcrypt=require('bcryptjs')

//  env config
 dotenv.config()

//  DB connection
    const connectDB=require('./config/db')
connectDB();

//  rest object
 const app=express()

//  middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes

 app.use('/api/v1/test',require('./routes/testRouter'));
 app.use('/api/v1/user',require('./routes/userRoute'));
 app.use('/api/v1/todo',require('./routes/todoRoute'));


//  port
const PORT=process.env.PORT||8000

// listen 
app.listen(PORT,()=>{
    console.log(`Server is running  ${process.env.DEV_MODE} mode on port ${PORT}`);
});
