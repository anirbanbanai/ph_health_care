import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDb = async (params: any) => {
    const {searchTerm,...filterData} = params;
  const andCOndition: Prisma.AdminWhereInput[] = [];
  const adminSearchbleField = ['name','email'];
  console.log(filterData);

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

  if(Object.keys(filterData).length >0){
     andCOndition.push({
        AND:Object.keys(filterData).map(key=>({
            [key]:{
               equals:filterData[key] 
            }
        }))
     })
  }
  const whereCOndition: Prisma.AdminWhereInput = { AND: andCOndition };

  const result = await prisma.admin.findMany({
    where: whereCOndition,
  });
  return result;
};

export const adminService = {
  getAllFromDb,
};
