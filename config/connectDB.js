import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`SERVER RUNNING on ${mongoose.connection.host}`)

    }
    catch(err){
        console.log(`error occur ${err.message}`)

    }
}

export default connectDB;