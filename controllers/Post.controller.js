import PostDonor from "../models/Post.donor.model.js";
import Donor from "../models/donor.model.js";
import AppError from "../utils/error.utlis.js";



const addPostDonor=async(req,res,next)=>{
try{
    const {patientName,phoneNumber,bloodGroup,city,state,quanity,hospitalName,urgencyLevel,description,status}=req.body
    console.log(patientName);

    if(!bloodGroup || !phoneNumber || !patientName || !city || !state){
        return next(new AppError("All field are Required",400))
    }
   
    const postDonor=await PostDonor.create({
        patientName,
        bloodGroup,
        phoneNumber,
        bloodGroup,
        city,
        state,
        quanity,
        hospitalName,
        urgencyLevel,
        description,
        status
    })

    await postDonor.save()

    res.status(200).json({
        success:true,
        message:"Post Added Succesfully",
        data:postDonor
    })

}catch(error){
    return next(new AppError(error.message,500))
}
}

const getPostDonor=async(req,res,next)=>{
    try{
        console.log("get post Donor b1");
        const postDonor=await PostDonor.find({ status: 0 })

        if(!postDonor){
            return next(new AppError("Post Donor not Found",400))
        }
       res.status(200).json({
         success:true,
         message:"All Post are:-",
         data:postDonor
       })
    }catch(error){
        return next(new AppError(error.message,500))
    }
}

const completePostDonor=async(req,res,next)=>{
    try {
        const {id} = req.params;
        console.log(id);
        // console.log(await Donor.findById(id));
        const updatedDonor =await  PostDonor.findByIdAndUpdate(
            id,
            { $set: { status: 1 } },
            { new: true }
          );
         console.log(updatedDonor);
    
        if (!updatedDonor) {
          return next(new AppError("Donor Not  found",400))
        }
    
        res.status(200).json({
            success:true,
            message:"Donor completed",
            data:updatedDonor
        })
      } catch (error) {
        res.status(500).send(error.message);
      }
}

const deletePostDonor=async(req,res,next)=>{
try{

    const {id}=req.params

    const post=await PostDonor.findById(id)

    if(!post){
        return next(new AppError("Post Donor Not found",403))
    }
    await PostDonor.findByIdAndDelete(id)
    

    res.status(200).json({
        success:true,
        message:"Post Donor Delete Succesfully"
    })

}catch(error){
    return next(new AppError(error.message,500))
}
}



export {
    addPostDonor,
    getPostDonor,
    completePostDonor,
    deletePostDonor
}