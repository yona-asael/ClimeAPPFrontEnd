import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PatientService } from '../../../core/services/patient.service';
import { Subject, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, tap, take } from 'rxjs/operators';
import  PatientDataSource  from '../../../core/datasource/patient.datasource';
import {DeleteDialogComponent} from 'app/Pages/shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  private ngUnsubscribe = new Subject();
  baseRoute = '/user';
  DataSource: PatientDataSource; 
  dataSource_loaded = false;
  displayedColumns: String[] = ['FOLIO','NAME', 'LASTNAME', 'DATE', 'ADDRESS', 'TEL',  'SEX', 'ACTIONS'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public patientService: PatientService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.DataSource = new PatientDataSource(this.patientService);
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

    this.DataSource = new PatientDataSource(this.patientService);

    this.DataSource.connect().pipe(take(2)).subscribe((value) => {
      this.dataSource_loaded = !!value;
    });
  }

  loadProviderList(): void {
    this.DataSource.loadPatients(this.paginator.pageSize, this.paginator.pageIndex);
  }


  deletePatient(id: String) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (result) {
        this.patientService.delete(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            this._snackBar.open('Paciente Eliminado', 'Cerrar', {
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
