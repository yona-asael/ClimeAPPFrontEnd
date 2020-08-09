import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientModel} from 'app/core/models/patient.model';
import {MedicModel} from 'app/core/models/medic.model';
import {AppointModel} from 'app/core/models/appoint.model';
import { Subject } from 'rxjs';
import { RecipeService } from 'app/core/services/recipe.service';
import { take, takeUntil } from 'rxjs/operators';
import { RecipeModel } from 'app/core/models/recipe.model';
import { IRecipe } from 'app/core/interface/Recipe.interface';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {
  private ngUnsubscribe = new Subject();
    public readOnly: boolean;
    public isAppointUpdate: boolean;
    public patients: PatientModel[];
    public medics: MedicModel[];
    public appint: AppointModel;
    private recipe: RecipeModel;
    public recipeForm: FormGroup;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isAppointUpdate = this.activatedRoute.snapshot.data['update'];
    const appointModel: AppointModel = <AppointModel>this.activatedRoute.snapshot.data['appoint'];
    if (appointModel) {
     this.appint = appointModel;
    }
    const recipeModel: RecipeModel = <RecipeModel>this.activatedRoute.snapshot.data['recipe'];
    if (recipeModel) {
      this.recipe = recipeModel;
    } else {
      this.recipe = new RecipeModel();
    }
    if (!this.isAppointUpdate) {
        const patientModel: PatientModel[] = <PatientModel[]>this.activatedRoute.snapshot.data['patients'];
        if (patientModel) {
         this.patients = patientModel;
        }
        const medicModel: MedicModel[] = <MedicModel[]>this.activatedRoute.snapshot.data['medics'];
        if (medicModel) {
            this.medics = medicModel;
        }
    }
    this.createForm();
  }


  createForm() {
    this.recipeForm = this.inputFB.group({
      dignostic: [{value: this.recipe.dignostic, disabled: this.readOnly}, [Validators.required]],
      TA: [{value: this.recipe.TA, disabled: this.readOnly}, [Validators.required]],
      FC: [{value: this.recipe.FC, disabled: this.readOnly}, [Validators.required]],
      FR: [{value: this.recipe.FR, disabled: this.readOnly}, [Validators.required]],
      T: [{value: this.recipe.T, disabled: this.readOnly}, [Validators.required]],
      dateExp: [{value: this.recipe.dateExp, disabled: this.readOnly}, [Validators.required]],
    });
  }

  saveChanges(): void {
    if (this.isAppointUpdate) {
      this.updateMedic();
    } else {
      this.addMedic();
    }
  }

  addMedic(): void {
    this.recipeService.create(this.getRecipe).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
    this._snackBar.open('Registrado Medico ', 'Cerrar', {
      duration: 2000,
    });
    this.router.navigate(['/appointmet']);
    });
  }

  updateMedic() {
    this.recipeService.create(this.getRecipe).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this._snackBar.open('Medico Actualizado', 'Cerrar', {
        duration: 2000,
      });
      this.router.navigate(['/appointmet']);
    });
  }

  get getRecipe() {
    const provControl = this.recipeForm.controls;
    const recipe: IRecipe  = {
      dignostic: provControl.diagnostic.value,
      date: Date.now().toString(),
      dateExp: provControl.dateExp.value,
      FC: provControl.FC.value,
      FR: provControl.FR.value,
      T: provControl.T.value,
      TA: provControl.TA.value,
      status: true,
    };
    return recipe;
  }
  get updatedRecipe(): RecipeModel {
    const provControl = this.recipeForm.controls;
    this.recipe.dignostic = provControl.diagnostic.value;
    this.recipe.dateExp = provControl.dateExp.value;
    this.recipe.FC = provControl.FC.value;
    this.recipe.FR = provControl.FR.value;
    this.recipe.T = provControl.T.value;
    this.recipe.TA = provControl.TA.value;
    return this.recipe;
  }


  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
