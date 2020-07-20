import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PersonModel } from '../models/person.model';
import { IPerson } from '../interface/Person.iterface';
import { PaginationModel } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private API = environment.API_ENDPOINT + 'persons';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };

  constructor(
    private http: HttpClient
  ) { }

  public findOne(id: String): Observable<PersonModel> {
    return this.http.get<PersonModel>(this.API + `/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }
  public getALL(): Observable<PersonModel[]> {
    return this.http.get<PersonModel[]>(this.API + '/', this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  public getList(limit: Number, page: Number): Observable<PaginationModel> {
    const params = { ... this.httpOptions }
    params.params = new HttpParams().set('limit', `${limit}`).set('page', `${page}`);
    return this.http.get<PaginationModel>(this.API + '/', params).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  public create(person: IPerson): Observable<PersonModel> {
    return this.http.post<PersonModel>(this.API, person, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public update(person: PersonModel): Observable<PersonModel> {
    return this.http.put<PersonModel>(this.API + `/${person._id}`, JSON.stringify(person), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public delete(id: String): Observable<boolean> {
    return this.http.delete<boolean>(this.API + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
