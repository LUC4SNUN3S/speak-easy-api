import { createPaginator, PaginateFunction } from 'prisma-pagination';

export const paginate: PaginateFunction = createPaginator({
  perPage: 10,
});
