import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';


export class BaseDataSource implements DataSource<any> {
  entitySubject = new BehaviorSubject<any[]>([]);
  hasItems: boolean = false;
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;

  // Paginator | Paginators count
  paginatorTotalSubject = new BehaviorSubject<number>(0);
  paginatorTotal$: Observable<number>;

  constructor() {
    this.loading$ = this.loadingSubject.asObservable();
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
    this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);
  }

  connect(): Observable<any[]> {
    return this.entitySubject.asObservable();
  }

  disconnect(): void {
    this.entitySubject.complete();
    this.loadingSubject.complete();
    this.paginatorTotalSubject.complete();
  }
}
