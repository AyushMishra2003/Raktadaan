import { Model,Schema, model, trusted } from "mongoose";


const PostDonorSchema=new Schema(
    {
        patientName:{
           type:String,
           required:true
        },
        phoneNumber:{
            type:String,
            required:true
        },
        bloodGroup:{
            type:String,
            enum:['O','O-','O+','A-','A+','B-','B+','AB','AB-'],
            required:true
        },
        quanity:{
            type:Number
        },
        hospitalName:{
            type:String
        },
        state:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        urgencyLevel:{
            type:String,
            enum:["low","high"],
            default:"low"
        },
        description:{
            type:String,
        },
        status:{
            type:String,
            enum:["0","1"],
            default:"0"
        }
    },
    {
        timestamps:true
    }
)

const PostDonor=model("POSTDONOR",PostDonorSchema)

export default PostDonor