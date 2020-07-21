import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, merge } from 'rxjs';
import MedicDataSource from '../../../../core/datasource/medic.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MedicService } from '../../../../core/services/medic.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, tap, take } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicListComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  baseRoute = '/services';
  DataSource: MedicDataSource;
  dataSource_loaded = false;
  displayedColumns: String[] = ['NAME', 'GRADE', 'UNIVERSITY', 'CEDP', 'ACTIONS'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public medicService: MedicService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.DataSource = new MedicDataSource(this.medicService);
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

    this.DataSource = new MedicDataSource(this.medicService);

    this.DataSource.connect().pipe(take(2)).subscribe((value) => {
      this.dataSource_loaded = !!value;
    });
  }

  loadProviderList(): void {
    this.DataSource.loadMedics(this.paginator.pageSize, this.paginator.pageIndex);
  }


  deleteClient(id: String) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (result) {
        this.medicService.delete(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
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
