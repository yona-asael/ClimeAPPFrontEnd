import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './base.datasource';
import { PersonService } from '../services/person.service';
import {AppointService} from '../services/appoint.service';

export default class AppointDataSource extends BaseDataSource {
    constructor(private appointService: AppointService) {
        super();
    }
    loadMedics(limit, page) {
        this.loadingSubject.next(true);
        this.appointService.getList(limit, page + 1)
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
