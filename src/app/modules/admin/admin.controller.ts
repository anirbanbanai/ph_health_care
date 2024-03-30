import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllFromDb = async(req:Request,res:Response)=>{
    const result =await adminService.getAllFromDb();

    res.status(200).json({
        success: true,
        message:"Admin data fatched!",
        data:result
    })
};


export const adminController={
    getAllFromDb
}