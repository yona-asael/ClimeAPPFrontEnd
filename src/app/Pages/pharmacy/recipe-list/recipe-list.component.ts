import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, merge } from 'rxjs';
import RecipeDataSource from '../../../../app/core/datasource/recipe.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RecipeService } from '../../../../app/core/services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, tap, take } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../shared/dialogs/delete-dialog/delete-dialog.component';
import {RecipeModel} from 'app/core/models/recipe.model';
import {RecipeDialogComponent} from 'app/Pages/shared/dialogs/recipe-dialog/recipe-dialog.component';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  baseRoute = '/services';
  DataSource: RecipeDataSource;
  dataSource_loaded = false;
  displayedColumns: String[] = ['ID', 'FECHA',  'ESTATUS', 'ACTIONS'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    public recipeService: RecipeService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.DataSource = new RecipeDataSource(this.recipeService);
 
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

    this.DataSource = new RecipeDataSource(this.recipeService);

    this.DataSource.connect().pipe(take(2)).subscribe((value) => {
      this.dataSource_loaded = !!value;
    });
  }

  loadProviderList(): void {
    this.DataSource.loadPatients(this.paginator.pageSize, this.paginator.pageIndex);
  }


  deleteClient(recipe ) {
    recipe.status = true;
    const dialogRef = this.dialog.open(RecipeDialogComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      if (result) {
        this.recipeService.update(recipe).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            this._snackBar.open('Receta surtida', 'Cerrar', {
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

