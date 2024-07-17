import { model,Schema } from "mongoose";

const HospitalSchema=new Schema(
    {
        hospitalName:{
            type:String
        },
        contactDetails:{
            type:String,
        },
        state:{
            type:String,
        },
        city:{
            type:String,
        },
        serviceProvide:[
            {
                type:String,
            }
        ],
        bloodBankAvailability:{
            type:String,
            enum:["yes","no"],
            default:"no"
        },
        hospitalmage:{
             public_id:{
                type:String
             },
             secure_url:{
                type:String
             }
        },
        hospitalDate:{
            type:Object
        },

        importantInfo:[
            {
                type:String,
            }
        ]
    },
    {
        timestamps:true
    }
)


const Hospital=model('HOSPITAL',HospitalSchema)

export default Hospital

