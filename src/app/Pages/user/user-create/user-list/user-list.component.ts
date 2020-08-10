import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PatientService } from '../../../../core/services/patient.service';
import { Subject, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, tap, take } from 'rxjs/operators';
import  HistoryDataSource from '../../../../core/datasource/history.datasource';
import {DeleteDialogComponent} from 'app/Pages/shared/dialogs/delete-dialog/delete-dialog.component';
import {PatientModel} from 'app/core/models/patient.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  baseRoute = '/user/create';
  DataSource: HistoryDataSource; 
  dataSource_loaded = false;
  displayedColumns: String[] = ['FOLIO', 'MEDIC', 'DATE', 'ACTIONS'];
  
  @Input() patient: PatientModel;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public patientService: PatientService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.DataSource = new HistoryDataSource(this.patientService);
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

    this.DataSource = new HistoryDataSource(this.patientService);

    this.DataSource.connect().pipe(take(2)).subscribe((value) => {
      this.dataSource_loaded = !!value;
    });
  }

 loadProviderList() {
   this.DataSource.loadPatientHistoy(this.patient._id,this.paginator.pageSize, this.paginator.pageIndex);
 }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
