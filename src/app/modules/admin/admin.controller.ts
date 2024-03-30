import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllFromDb = async(req:Request,res:Response)=>{
    // console.log(req.query);
    const result =await adminService.getAllFromDb(req.query);

    res.status(200).json({
        success: true,
        message:"Admin data fatched!",
        data:result
    })
};


export const adminController={
    getAllFromDb
}