import { MedicModel } from "./medic.model";
import { PersonModel } from "./person.model";
import { PatientModel } from "./patient.model";
import {AppointModel} from "./appoint.model";

export class PaginationModel {
  data: AppointModel[] | PatientModel[] | MedicModel[] | PersonModel[] | null;
  history: PatientModel;
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
