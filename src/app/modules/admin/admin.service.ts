import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getAllFromDb = async()=>{
    const result = await prisma.admin.findMany();
    return result
}

export const adminService = {
    getAllFromDb
}