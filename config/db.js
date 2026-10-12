const mongoose=require('mongoose');
const dotenv=require('dotenv');

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,);
        console.log(`MongoDB connected: ${mongoose.connection.host}`);

    }catch(error){
        console.log('Error connecting to MongoDB:, ${error}');
        
    }
};

module.exports=connectDB;