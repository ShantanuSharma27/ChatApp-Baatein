const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    token:{
        type:String,    
    }

},{
    timestamps:true
})

//isko kahin aur likh liyo in my opinion not in righy place.
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
//as i have encrypt the password and save in db there this is pre middleware
userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
module.exports= mongoose.model('User',userSchema);