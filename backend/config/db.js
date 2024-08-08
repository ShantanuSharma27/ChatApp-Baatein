const mongoose= require('mongoose');
const connectDb= async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log("Db connected Successfully")
    }catch(err){
        console.log(err.message);
    }
}
module.exports=connectDb;