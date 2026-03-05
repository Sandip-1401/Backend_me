import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

interface ListQueryOptions {
  skip: number;
  limit: number;
  search?: string;
  searchColumns?: string[];
  sort?: string;
  order?: "ASC" | "DESC";
}

export function applyListQuery<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  options: ListQueryOptions
) {
  const { skip, limit, search, searchColumns, sort, order } = options;

  // SEARCH
  if (search && searchColumns && searchColumns.length > 0) {
    searchColumns.forEach((column, index) => {
      if (index === 0) {
        query.andWhere(`${column} ILIKE :search`, {
          search: `%${search}%`
        });
      } else {
        query.orWhere(`${column} ILIKE :search`, {
          search: `%${search}%`
        });
      }
    });
  }

  // SORT
  if (sort) {
    query.orderBy(sort, order || "ASC");
  }

  // PAGINATION
  query.skip(skip).take(limit);

  return query;
}