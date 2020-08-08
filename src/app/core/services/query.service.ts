import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { QueryModel } from '../models/query.model';
import { IQuery } from '../interface/query.interface';
import { PaginationModel } from '../models/pagination.model';


@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private API = environment.API_ENDPOINT + 'query';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };

  constructor(
    private http: HttpClient
  ) { }

  public findOne(id: string): Observable<QueryModel> {
    return this.http.get<QueryModel>(this.API + `/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  public getALL(): Observable<QueryModel[]> {
    return this.http.get<QueryModel[]>(this.API + '/', this.httpOptions).pipe(
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

  public create(user: IQuery): Observable<QueryModel> {
    return this.http.post<QueryModel>(this.API, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public update(user: QueryModel): Observable<QueryModel> {
    return this.http.put<QueryModel>(this.API + `/${user.folio}`, JSON.stringify(user), this.httpOptions).pipe(
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
