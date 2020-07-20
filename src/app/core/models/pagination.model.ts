
export class PaginationModel {
    data: PaginationModel[] | null;
    pagination: Pagination
}


export class Pagination {
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
    prevPage: Number | null;
    nextPage: Number;
    perPage: Number;
    totalPages: Number;
    page: Number;
}
