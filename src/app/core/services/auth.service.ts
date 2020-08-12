import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import {IUser} from '../interface/User.interface';
import {TokenStorage} from './token-storage.service';


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
    private http: HttpClient,
    private tokenStorage: TokenStorage, 
  ) { }

  public signUp(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.API + `/login`, user, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public register(user: IUser): Observable<UserModel> {
    return this.http.post<UserModel>(this.API + `/register`, user, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  public update(user: UserModel, id: string): Observable<UserModel> {
     return this.http.put<UserModel>(this.API + `/${id}`, user, this.httpOptions).pipe(
        catchError(this.handleError)
    );

  }

  public singIn(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.API + '/register', user, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  public profile(): Observable<UserModel> {
    return this.http.get<UserModel>(this.API + '/profile', this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public verifyUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.API + `/${id}`, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }


 public validatetoken(): boolean {
    return !!this.tokenStorage.getAccessToken();
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
