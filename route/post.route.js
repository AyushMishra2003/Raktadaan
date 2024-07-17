import { Router } from "express";
import { addPostDonor, completePostDonor, deletePostDonor, getPostDonor } from "../controllers/Post.controller.js";



const postDonor=Router()


postDonor.get("/",getPostDonor)
postDonor.post("/",addPostDonor)
postDonor.get("/:id",completePostDonor)
postDonor.delete("/:id",deletePostDonor)



export default postDonor