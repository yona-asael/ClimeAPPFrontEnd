import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientModel} from '../../../core/models/patient.model';
import {MedicModel} from '../../../core/models/medic.model';
import {AppointModel} from '../../../core/models/appoint.model';
import { Subject } from 'rxjs'
import { RecipeService } from '../../../core/services/recipe.service';
import { take, takeUntil } from 'rxjs/operators';
import { RecipeModel } from '../../../core/models/recipe.model';
import { IRecipe } from '../../../core/interface/Recipe.interface';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {AppointService} from '../../../core/services/appoint.service';
import {PatientService} from 'app/core/services/patient.service';

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
    public appoint: AppointModel;
    private recipe: RecipeModel;
    public recipeForm: FormGroup;
    private add: boolean;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private appoinService: AppointService,
    private patientService: PatientService,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isAppointUpdate = this.activatedRoute.snapshot.data['update'];
    this.add = this.activatedRoute.snapshot.data['add'];
    const appointModel: AppointModel = <AppointModel>this.activatedRoute.snapshot.data['appoint'];
    if (appointModel) {
     this.appoint = appointModel;
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
      this.updatedRecipes();
    } else {
      this.addRecipe();
    }
  }

  addRecipe(): void {
    this.recipeService.create(this.getRecipe).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        //this.appoinService.update().subscribe(res=>{
            this._snackBar.open('Registrado Medico ', 'Cerrar', {
                duration: 2000,
            });
       // });
    this.router.navigate(['/appointmet']);
    });
  }

  updatedRecipes() {
    this.recipeService.create(this.getRecipe).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
    this.appoint.status = true;
    this.appoint.recipe = res._id;
       this.appoinService.update(this.appoint).subscribe(response => {
            this._snackBar.open('Consulta finalizada ', 'Cerrar', {
                duration: 2000,
            });
            if(this.add){
                let id: string;
                if ( this.appoint.patient instanceof String) {
                   id = <string>this.appoint.patient;
                } else {
                    id = (<PatientModel>this.appoint.patient)._id;
                }
                this.patientService.addHistory(id, this.appoint._id).subscribe(() => {
                });
            }
            this.router.navigate(['/appointment']);
        });
    });
  }

  get getRecipe() {
    const provControl = this.recipeForm.controls;
    const recipe: IRecipe  = {
      dignostic: provControl.dignostic.value,
      date: Date.now().toString(),
      dateExp: provControl.dateExp.value,
      FC: provControl.FC.value,
      FR: provControl.FR.value,
      T: provControl.T.value,
      TA: provControl.TA.value,
      status: false,
      //modificar el appointmen status
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
