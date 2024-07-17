import {model,Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const donorSchema=new Schema(
    {
         name:{
            type:String,
            required:true
         },
         email:{
            type:String,
            required:true
         },
         password:{
            type:String,
            required:true
         },
         bloodGroup:{
            type:String,
            enum:['O','O-','O+','A-','A+','B-','B+','AB','AB-'],
         },
         age:{
            type:String,
            default:""
         },
         phoneNumber:{
            type:String,
            default:""
         },
         state:{
            type:String,
            default:""
         },
         city:{
            type:String,
            default:""
         },
         availabilityStatus:{
            type:String,
            enum:["yes","no"],
            default:"no"
         }
     
    }, 
   {
    timestamps:true
  }
)

donorSchema.pre('save',async function(next){
   if(!this.isModified('password')){
       return next()
   }
   this.password=await bcrypt.hash(this.password,10)
   return next()
})
donorSchema.methods={
   generateJWTToken:async function(){
       return await jwt.sign(
           {id:this._id,email:this.email},
           process.env.SECRET,
           {
               expiresIn:'24h'
           }
       ) 
   },
   comparePassword:async function(plaintextPassword){
      return await bcrypt.compare(plaintextPassword,this.password)
   },

   generatePasswordResetToken: async function () {
     const resetToken = crypto.randomBytes(20).toString('hex')

     this.forgetPasswordToken = crypto
         .createHash('sha256')
         .update(resetToken)
         .digest('hex');
     this.forgetPasswordExpiry = Date.now() + 5 * 60 * 1000
    console.log(this.forgetPasswordExpiry);
     return resetToken
 }
}


const Donor=model('Donor',donorSchema)


export default Donor