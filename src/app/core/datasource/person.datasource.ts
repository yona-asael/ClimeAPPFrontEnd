import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './base.datasource';
// import { DataSourceModel } from '../models/datasource.model';
import { PersonService } from '../services/person.service';

export default class PersonDataSource extends BaseDataSource {

    constructor(private personService: PersonService) {
        super();
    }
    loadPersons(limit, page ) {
        this.loadingSubject.next(true);
        this.personService.getList(limit, page + 1 )
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
