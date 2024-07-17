import Donor from "../models/donor.model.js";
import AppError from "../utils/error.utlis.js";
const cokkieOption={ 
    secure:process.env.NODE_ENV==='production'?true:false,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
}

const addDonor=async(req,res,next)=>{
try{
    console.log(req.body);
  const {name,email,password,bloodGroup,age,phoneNumber,state,city,availabilityStatus}=req.body

  if(!name || !email || !password || !bloodGroup || !age || !phoneNumber || !state || !city  || !availabilityStatus){
    return next(new AppError("All field are Required",400))
  }
  console.log("mai aaya hu kya");
  const donor=await Donor.create({
    name,
    email,
    password,
    age,
    phoneNumber,
    state,
    city,
    availabilityStatus
 })

 await donor.save()


 donor.password=undefined

 const token=await donor.generateJWTToken()

 console.log(token);


 res.cookie('token',token,cokkieOption)

 res.status(200).json({
     success:true,
     "message":"REGISTRED SUCCEFULLY",
     data:donor,
     token:token
 })

}catch(error){
    return next(new AppError(error.message,500))
}
}

const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        console.log(email,password);
        if(!email || !password){
         return next(new AppError('All fields are required',400))
        }
        
        const donor=await Donor.findOne({
             email
        }).select('+password')

        console.log(donor);
     
        
        const isPassword=await donor.comparePassword(password);

        console.log(isPassword);
        if(!donor || !isPassword){
         return next(new AppError('Email or Password not matched',400))
        }
        const token=await donor.generateJWTToken()
       
        console.log(res.cookie);
     
     
        console.log(token);
     
        donor.password=undefined
        res.cookie('token',token,cokkieOption)
     
        console.log(res.cookie);
     //    res.cookie('token', token, {
     //     httpOnly: true,
     //     secure: false, // Set to true if using HTTPS
     //     sameSite: 'none', // Change if needed based on your CORS configuration
     //     maxAge: 7 * 24 * 60 * 60 * 1000, // Example for a 7-day expiry
     //   });
     
     
        res.status(200).json({
         success:true,
         "message":"Login Succesfully",
         data:donor,
        })
     }catch(e){
         return next(new AppError("Bad request is not found",500))
     }
}

const getDonor=async(req,res,next)=>{
try{
    const donor=await Donor.find({})

    console.log(donor);

    if(!donor){
        return next(new AppError("Donor not found",400))
    }
    
    res.status(200).json({
        success:true,
        message:"All donor are:-",
        data:donor
    })

}catch(error){
 return next(new AppError("not found",500))
}
}

const registrationDonor=async(req,res,next)=>{
try{
  const {bloodGroup,age,phoneNumber,state,city,lastDonation,availabilityStatus}=req.body
  const donor=await Donor.findById(id)

  if(!donor){
    return next(new AppError("Donor not Found",400))
  }

  console.log(donor);

  donor.bloodGroup=bloodGroup
  donor.age=age
  donor.phoneNumber=phoneNumber
  donor.state=state
  donor.city=city
  donor.lastDonation=lastDonation
  donor.availabilityStatus=availabilityStatus

  await donor.save()

  res.status(200).json({
    success:true,
    message:"Registrated Successfully",
    data:donor
  })


}catch(error){
    return next(new AppError(error.message,500))
}
}


const getSingleDonor=async(req,res,next)=>{
    try{
        //  console.log("get single donor");
         const {id}=req.params
         console.log(id);
        const donor=await  Donor.findById(id).select('+password')
            // console.log("my donor ");
            // console.log(donor);

        if(!donor){
            return next(new AppError("Donor not Found",400))
        }
    //    console.log("get donoro");

        res.status(200).json({
            success:true,
            message:"Single donor are:-",
            data:donor
        })

    }catch(error){
        return(error.message,500)
    }
}

const deleteDonor=async(req,res,next)=>{
try{
  const {id}=req.params

  const donor=await Donor.findById(id)

  if(!donor){
    return next(new AppError("Donor not found",403))
  }

  await Donor.findByIdAndDelete(id)


  res.status(200).json({
    success:true,
    message:"Donor Delete Successfully"
  })

}catch(error){
    return next(new AppError(error.message,500))
}
}

export {
    addDonor,
    getDonor,
    login,
    getSingleDonor,
    registrationDonor,
    deleteDonor
}