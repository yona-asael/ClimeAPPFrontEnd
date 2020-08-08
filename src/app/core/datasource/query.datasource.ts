import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './base.datasource';
// import { DataSourceModel } from '../models/datasource.model';
import { PersonService } from '../services/person.service';
import { QueryService } from '../services/query.service';

export default class QueryDataSource extends BaseDataSource {

    constructor(private queryService: QueryService ) {
        super();
    }
    loadMedics(limit, page) {
        this.loadingSubject.next(true);
        this.queryService.getList(limit, page + 1)
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
