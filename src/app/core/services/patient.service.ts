import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PaginationModel }  from '../models/pagination.model';
import {PatientModel} from '../models/patient.model';
import {IPatient} from '../interface/Patient.interface';
import {TokenStorage} from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private API = environment.API_ENDPOINT + 'patients';
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

  public findOne(id: String): Observable<PatientModel> {
    return this.http.get<PatientModel>(this.API + `/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }
  public getALL(): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(this.API + '/', this.httpOptions).pipe(
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

  public create(user: IPatient): Observable<PatientModel> {
    return this.http.post<PatientModel>(this.API, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public update(user: PatientModel): Observable<PatientModel> {
    return this.http.put<PatientModel>(this.API + `/${user._id}`, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public delete(id: String ): Observable<boolean> {
    return this.http.delete<boolean>(this.API + `/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public getHistoryList(id: string, limit: Number, page: Number): Observable<PaginationModel> {
    const params = { ... this.httpOptions }
    params.params = new HttpParams().set('limit', `${limit}`).set('page', `${page}`);
    return this.http.get<PaginationModel>(this.API + `/${id}/history`, params).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

 public addHistory(id: string, appointid: string): Observable<PatientModel> {
    return this.http.post<PatientModel>(this.API + `/${id}/history`, JSON.stringify({id: appointid}), this.httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }}
