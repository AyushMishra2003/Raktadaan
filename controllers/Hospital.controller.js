import Hospital from "../models/hospital.model.js";
import AppError from "../utils/error.utlis.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const addHospital=async(req,res,next)=>{
try{

    console.log(req.file);
    console.log("add hospital");
    const {hospitalName, contactDetails, state,  city,serviceProvide,  bloodBankAvailability,importantInfo,hospitalDate}=req.body
    
    // if(!hospitalName || !contactDetails || !state || !city || !serviceProvide || !bloodBankAvailability || !hospitalDate){
    //     return next(new AppError("All Filed are Required",400))
    // }

    const hospital=await Hospital.create({
        hospitalName,
        contactDetails,
        state,
        city,
        serviceProvide,
        bloodBankAvailability,
        importantInfo,
        hospitalDate
    })

    if(req.file){
        console.log("hello");
          const result=await cloudinary.v2.uploader.upload(req.file.path,{
              folder:'lms'
          })
          console.log(result);
          if(result){
              console.log("mai hu naa re baba");
              hospital.hospitalmage.public_id=result.public_id,
              hospital.hospitalmage.secure_url=result.secure_url
          }
          fs.rm(`uploads/${req.file.filename}`)
    }
   
    
    console.log(hospital);



    if(!hospital){
        return next(new AppError("Hospital Not Found",400))
    }

    
    await hospital.save()

    res.status(200).json({
        success:true,
        message:"Hospital added Succesfully",
        data:hospital
    })


}catch(error){
    return next(new AppError(error.message,500))
}
}

const getHospital=async(req,res,next)=>{
    try{
        
       const hospital=await Hospital.find({})

       if(!hospital){
        return next(new AppError("No hospital Data Found",400))
       }

       res.status(200).json({
        success:true,
        message:"Hospital data are:-",
        data:hospital
       })

    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const updateHospital=async(req,res,next)=>{
try{
 const {id}=req.params
 console.log(req.body);
 const hospital = await Hospital.findByIdAndUpdate(
    id,
    { $set: req.body }, // Update with entire req.body
    { new: true, runValidators: true } // Set new: true to return the updated document
  );

if(!hospital){
    return next(new AppError("Hospital  Not Found",403))
}

res.status(200).json({
    success:true,
    message:"Hospital Update Succesfully",
    data:hospital
})
}catch(error){
    return next(new AppError(error.message,500))
}
}


const deleteHospital=async(req,res,next)=>{
try{
  
    const {id}=req.params

    const hospital=await Hospital.findById(id)

    if(!hospital){
        return next(new AppError("Hospital Not found",403))
    }

    await Hospital.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message:"Hospital Data Delete Succesfully",
    })
}catch(error){
    return next(new AppError(error.message,500))
}
}

export {
    addHospital,
    getHospital,
    updateHospital,
    deleteHospital
}