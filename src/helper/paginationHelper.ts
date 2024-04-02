type IOption = {
  page?: number;
  limit?: number;
  sortOrder?: number;
  sortBy?: string;
};

type IOptionResult = {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: number;
};

const calculatePagination = (options: IOption): IOptionResult => {
  const page: number = Number(options?.page) || 1;
  const limit: number = Number(options?.limit) || 10;
  const skip: number = Number(page - 1) * limit;
  const sortBy: string = options?.sortBy || "createdAt";
  const sortOrder: any = options?.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
