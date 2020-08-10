import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './base.datasource';
import { PersonService } from '../services/person.service';
import {PatientService} from '../services/patient.service';
import {PatientModel} from '../models/patient.model';
import {AppointModel} from '../models/appoint.model';

export default class HistoryDataSource extends BaseDataSource {
    constructor(private patientService: PatientService) {
        super();
    }
    loadPatientHistoy(id, limit, page) {
        this.loadingSubject.next(true);
        this.patientService.getHistoryList(id,limit, page + 1)
            .pipe(
                tap(res => {
                    this.entitySubject.next(res.history.history);
                     this.paginatorTotalSubject.next(Number(res.pagination.perPage) * Number(res.pagination.totalPages));
                }),
                catchError(err => of('error')),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe();
    }

}
