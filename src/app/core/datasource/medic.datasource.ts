import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './base.datasource';
// import { DataSourceModel } from '../models/datasource.model';
import { PersonService } from '../services/person.service';
import { MedicService } from '../services/medic.service';

export default class MedicDataSource extends BaseDataSource {

    constructor(private medicService: MedicService ) {
        super();
    }
    loadMedics(limit, page) {
        this.loadingSubject.next(true);
        this.medicService.getList(limit, page + 1)
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
