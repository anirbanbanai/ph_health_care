import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchbleField } from "./admin.constant";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";

const getAllFromDb = async (params: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCOndition: Prisma.AdminWhereInput[] = [];

  // old method
  //   if (params.searchTerm) {
  //     andCOndition.push({
  //       OR: [
  //         {
  //           name: {
  //             contains: params.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //         {
  //           email: {
  //             contains: params.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //       ],
  //     });
  //   }

  if (params.searchTerm) {
    andCOndition.push({
      OR: adminSearchbleField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCOndition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }
  andCOndition.push({
    isDeleted: false,
  });

  const whereCOndition: Prisma.AdminWhereInput = { AND: andCOndition };

  const result = await prisma.admin.findMany({
    where: whereCOndition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereCOndition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDb = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDb = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });

  return result;
};
const deleteIntoDb = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (txc) => {
    const adminDeleyediNTOdB = await txc.admin.delete({
      where: {
        id,
      },
    });

    const userDeletedIntoDb = await txc.user.delete({
      where: {
        email: adminDeleyediNTOdB.email,
      },
    });
    return adminDeleyediNTOdB;
  });

  return result;
};

const softDeleteIntoDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (txc) => {
    const adminDeleyediNTOdB = await txc.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await txc.user.update({
      where: {
        email: adminDeleyediNTOdB.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return { adminDeleyediNTOdB };
  });

  return result;
};

export const adminService = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteIntoDb,
  softDeleteIntoDb,
};
