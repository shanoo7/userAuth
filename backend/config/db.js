import mongoose from "mongoose";

const connectDb = async (URI)=>{
    try {
      await  mongoose.connect(URI) 
      console.log("mongoDb connection successfully...")  
    } catch (error) {
        console.log("mongoDb connection faild...")
    }
}

export default connectDb ;