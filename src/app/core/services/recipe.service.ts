import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private API = environment.API_ENDPOINT + 'recipes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };

  constructor(
    private http: HttpClient
  ) { }

  public findOne(id: string): Observable<any> {
    return this.http.get<any>(this.API + `/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }
  public getALL(): Observable<any[]> {
    return this.http.get<any[]>(this.API + '/', this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError),
    );
  }

  public create(user: any): Observable<any> {
    return this.http.post<any>(this.API, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public update(user: any): Observable<any> {
    return this.http.put<any>(this.API + `/${user.id}`, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public delete(id: number): Observable<boolean> {
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
