export interface ListQueryParams {
   page: number;
   limit: number;
   skip: number;
   search?: string;
   sort?: string;
   order: "ASC" | "DESC";
}

export function parseListQuery(query: any): ListQueryParams {

   const page = Math.max(Number(query.page) || 1, 1);
   const limit = Math.min(Number(query.limit) || 10, 100);

   const skip = (page - 1) * limit;

   const search = query.search ? String(query.search) : undefined;

   const sort = query.sort ? String(query.sort) : undefined;

   const order =
      query.order && String(query.order).toUpperCase() === "DESC"
         ? "DESC"
         : "ASC";

   return {
      page,
      limit,
      skip,
      search,
      sort,
      order
   };
}