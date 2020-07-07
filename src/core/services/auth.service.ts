import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { signUp } from '../../../../../Documents/web/BackEnd/server/controllers/auth.controller';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = environment.API_ENDPOINT + 'auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };

  constructor(
    private http: HttpClient
  ) { }

  public signUp(id: Number): Observable<any> {
    return this.http.get<any>(this.API + `/login`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }
  public singIn(): Observable<any[]> {
    return this.http.get<any[]>(this.API + '/register', this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  public profile(user: any): Observable<any> {
    return this.http.get<any[]>(this.API + '/profile', this.httpOptions).pipe(
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
