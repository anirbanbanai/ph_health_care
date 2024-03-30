import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

const createAdmin = async (data: any) => {

  const hashedPassword:string = await bcrypt.hash(data.password,12)
  // console.log({ hashedPassword});

  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (txc) => {
    await txc.user.create({
      data: userData,
    });

    const createdAdminData = await txc.admin.create({
      data: data.admin,
    });
    return createdAdminData;
  });

  return result;
};

export const userService = {
  createAdmin,
};
