import { MedicModel } from "./medic.model";
import { PersonModel } from "./person.model";
import { PatientModel } from "./patient.model";

export class PaginationModel {
  data: PatientModel[] | MedicModel[] | PersonModel[] | null;
  pagination: Pagination;
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
