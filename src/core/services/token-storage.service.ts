import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
    providedIn: 'root'
})
export class TokenStorage {

    public getAccessToken(): string {
        return localStorage.getItem('token') as string;
    }

    public setAccessToken(token: string): TokenStorage {
        localStorage.setItem('token', JSON.stringify(token));
        return this;
    }

    public clearToken() {
        localStorage.removeItem('token');
    }

    public getItems(module): Observable<any> {
        try {
            return of(localStorage.getItem(module));
        } catch (e) { }
    }

    public setItems(module, values): void {
        localStorage.setItem(module, JSON.stringify(values));
    }

    public removeItems(module) {
        localStorage.removeItem(localStorage.getItem(module));
    }

    public clearItem(item: string) {
        localStorage.removeItem(item);
    }

}
