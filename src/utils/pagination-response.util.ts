export const buildPagination = (data: any, total: number, page: number, limit: number) => {
  const totalPage = Math.ceil(total / limit);

  return {
    pagination: {
      total,
      page,
      limit,
      totalPage,
    },
    data,
  };
};
