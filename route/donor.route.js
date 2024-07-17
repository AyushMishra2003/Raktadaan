import { Router } from "express";
import { addDonor, deleteDonor, getDonor, getSingleDonor, login, registrationDonor } from "../controllers/Donor.controller.js";
import { addPostDonor, getPostDonor } from "../controllers/Post.controller.js";



const donor=Router()

donor.post("/",addDonor)
donor.delete("/:id",deleteDonor)
donor.put("/:id",registrationDonor)
donor.get("/",getDonor)
donor.post("/login",login)
donor.get("/single/:id",getSingleDonor)





export default donor