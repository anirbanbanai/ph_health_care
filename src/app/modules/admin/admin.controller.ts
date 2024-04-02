import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";

const getAllFromDb = async (req: Request, res: Response) => {
  // console.log(req.query);
  try {
    const filter = pick(req.query, adminFilterableField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await adminService.getAllFromDb(filter, options);

    res.status(200).json({
      success: true,
      message: "Admin data fatched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const getByIdFromDb = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const result = await adminService.getByIdFromDb(id);
    res.status(200).json({
      success: true,
      message: "Admin data fatched by id!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || "Something went wrong",
      error: err,
    });
  }
};

const updateIntoDb  =async (req: Request, res: Response)=>{
  const {id} = req.params;
  console.log('id',id);
  console.log('data',req.body);
  try {
    const result = await adminService.updateIntoDb(id,req.body);
    res.status(200).json({
      success: true,
      message: "Admin data Updated by id!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || "Something went wrong",
      error: err,
    });
  }
}
const deleteIntoDb  =async (req: Request, res: Response)=>{
  const {id} = req.params;
  try {
    const result = await adminService.deleteIntoDb(id);
    res.status(200).json({
      success: true,
      message: "Admin data deleted successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || "Something went wrong",
      error: err,
    });
  }
}
const softDeleteIntoDb  =async (req: Request, res: Response)=>{
  const {id} = req.params;
  try {
    const result = await adminService.softDeleteIntoDb(id);
    res.status(200).json({
      success: true,
      message: "Admin data deleted successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err || "Something went wrong",
      error: err,
    });
  }
}

export const adminController = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteIntoDb,
  softDeleteIntoDb
};
