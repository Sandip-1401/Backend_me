export const applyPagination = (
   query: any,
   skip: number,
   limit: number
) => {
   query.skip(skip).take(limit);
}

export const applySorting = (
   query: any,
   alias: string,
   sort?: string,
   order: "ASC" | "DESC" = "ASC",
   allowedSortFields: string[] = []
) => {
   if (sort && allowedSortFields.includes(sort)) {
      query.orderBy(`${alias}.${sort}`, order);
   } else { 
      query.orderBy(`${alias}.created_at`, "DESC");
   }
}

export const applySearch = (
   query: any,
   fields: string[],
   search?: string
) => {

   const searchValue = search?.replace(/\s/g, "");

   if (!search) return;

   const conditions = fields
      .map((field, index) => `REPLACE(${field}, ' ','') ILIKE :search`)
      .join(" OR ");

   query.andWhere(`(${conditions})`, {
      search: `%${searchValue}%`
   });
}

export const applyFilter = (
   query: any,
   field: string,
   value?: string
) => {
   if (!value) return;

   query.andWhere(`${field} = :value`, { value });
}


//Maintaine this order : Filter -> Search -> Sort -> Pagination 
//Because for example agar ham pahele pagination laga de to result wronge ayega....samj rahe ho na...
//and jaha vi use karo vaha vi pahe le createQueryBuilder and if need joins then and then these all...