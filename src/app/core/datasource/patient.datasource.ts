import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './base.datasource';
// import { DataSourceModel } from '../models/datasource.model';
import { PatientService  } from '../services/patient.service';

export default class PatientDataSource extends BaseDataSource {

    constructor(private patientSercice: PatientService) {
        super();
    }
    loadPatients(limit, page) {
        this.loadingSubject.next(true);
        this.patientSercice.getList(limit, page + 1)
            .pipe(
                tap(res => {
                    this.entitySubject.next(res.data);
                    this.paginatorTotalSubject.next(Number(res.pagination.perPage) * Number(res.pagination.totalPages));
                }),
                catchError(err => of('error')),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe();
    }


}
