import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PaginationModel } from '../models/pagination.model';
import {RecipeModel} from '../models/recipe.model';
import {IRecipe} from '../interface/Recipe.interface';
import {TokenStorage} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private API = environment.API_ENDPOINT + 'recipes';
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

  public findOne(id: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(this.API + `/${id}`, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }
  public getALL(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(this.API + '/', this.httpOptions).pipe(
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


  public create(user: IRecipe): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(this.API, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public update(user: RecipeModel): Observable<RecipeModel> {
    return this.http.put<RecipeModel>(this.API + `/${user._id}`, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public delete(id: string): Observable<boolean> {
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
