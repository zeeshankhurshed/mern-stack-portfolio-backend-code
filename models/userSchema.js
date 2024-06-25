import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const userSchema=new mongoose.Schema({
    fullName:{type:String, required:[true, 'Name required'],},
    email:{type:String, required:[true, 'Email required'],unique:true,},
    phone:{type:String, required:[true, 'Phone number required'],},
    aboutMe:{type:String, required:[true, 'About Me required'],},
    password:{type:String, required:[true, 'Password required'], select:false,},
    avatar:{
        public_id:
        {type:String, required:true, },
    url:{type:String,
        required:true,
    },
},
    resume:{
        public_id:
        {type:String, required:true, },
    url:{type:String,
        required:true,
    },
},
portfolioURL:{
    type:String,
    required:[true,"Portfolio url required"]
}, 
githubURL:String,
instagramURL:String,
facebookURL:String,
twitterURL:String,
linkedInURL:String,
resetPasswordToken:String,
resetPasswordExpire:Date,
});
//for hashing password
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});
//comparing password with hashpassword
userSchema.methods.comparePassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
//generating web token
userSchema.methods.generateJsonWebToken=function (){
return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRES
})
};
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    return resetToken;
};
export const User=mongoose.model("User", userSchema);