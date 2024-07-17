import { Router } from "express";
import { addHospital, deleteHospital, getHospital, updateHospital } from "../controllers/Hospital.controller.js";
import upload from "../middlewares/multer.middleware.js";

const hospital=Router()


hospital.post("/",upload.single("hospitalmage"),addHospital)
hospital.get("/",getHospital)
hospital.put("/:id",updateHospital)
hospital.delete("/:id",deleteHospital)

export default hospital