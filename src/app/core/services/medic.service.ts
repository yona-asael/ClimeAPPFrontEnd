import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MedicModel } from '../models/medic.model';
import { IMedic } from '../interface/Medic.interface';
import { PaginationModel } from '../models/pagination.model';
import {TokenStorage} from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private API = environment.API_ENDPOINT + 'medics';
  private httpOptions = {
    headers: new HttpHeaders({
      'Auth-Token': this.tokenStorage.getAccessToken().replace(/['"]+/g, ''),
      'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) { }

  public findOne(id: string): Observable<MedicModel> {
    return this.http.get<MedicModel>(this.API + `/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  public getALL(): Observable<MedicModel[]> {
    return this.http.get<MedicModel[]>(this.API + '/', this.httpOptions).pipe(
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

  public create(user: IMedic): Observable<MedicModel> {
    return this.http.post<MedicModel>(this.API, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public update(user: MedicModel): Observable<MedicModel> {
    return this.http.put<MedicModel>(this.API + `/${user._id}`, JSON.stringify(user), this.httpOptions).pipe(
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
