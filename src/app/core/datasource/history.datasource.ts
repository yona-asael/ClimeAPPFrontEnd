import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './base.datasource';
import { PersonService } from '../services/person.service';
import {PatientService} from '../services/patient.service';

export default class HistoryDataSource extends BaseDataSource {
    constructor(private patientService: PatientService) {
        super();
    }
    loadMedics(limit, page) {
        this.loadingSubject.next(true);
        this.patientService.getList(limit, page + 1)
            .pipe(
                tap(res => {
                    this.entitySubject.next(res.data);
                    this.paginatorTotalSubject.next(Number(res.pagination.totalPages) * Number(res.pagination.totalPages));
                }),
                catchError(err => of('error')),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe();
    }

}
