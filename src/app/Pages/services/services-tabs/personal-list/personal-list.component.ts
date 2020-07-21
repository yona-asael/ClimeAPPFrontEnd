import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PersonService } from '../../../../core/services/person.service';
import { Subject, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, tap, take } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared/dialogs/delete-dialog/delete-dialog.component';
import PersonDataSource from '../../../../core/datasource/person.datasource';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalListComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  baseRoute = '/services';
  DataSource: PersonDataSource;
  dataSource_loaded = false;
  displayedColumns: String[] = ['NAME', 'LASTNAME', 'ADDRESS', 'CELLPHONE', 'JOB', 'ACTIONS'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public personService: PersonService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.DataSource = new PersonDataSource(this.personService);
  }

  ngAfterViewInit(): void {
    this.initTable();
    this.loadProviderList();
  }

  initTable(): void {
    this.sort.sortChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => (this.paginator.pageIndex = 0));
    this.sort.direction = 'desc';

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadProviderList();
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe();

    this.DataSource = new PersonDataSource(this.personService);

    this.DataSource.connect().pipe(take(2)).subscribe((value) => {
      this.dataSource_loaded = !!value;
    });
  }

  loadProviderList(): void {
    this.DataSource.loadPersons(this.paginator.pageSize, this.paginator.pageIndex);
  }


  deleteClient(id: String) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (result) {
        this.personService.delete(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            this._snackBar.open('Persona Eliminado', 'Cerrar', {
              duration: 2000,
            });
          }
          this.loadProviderList();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
