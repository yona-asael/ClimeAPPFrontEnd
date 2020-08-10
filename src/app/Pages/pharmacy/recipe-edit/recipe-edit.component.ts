import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeModel } from '../../../../app/core/models/recipe.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RecipeService } from '../../../core/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResolverEnums } from '../../../core/enums/resolver.enums';
import { IRecipe } from '../../../../app/core/interface/Recipe.interface';
import { takeUntil } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PersonModel } from '../../../core/models/person.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  readOnly: boolean;
  baseRoute = '/services';
  isRecipeUpdated: boolean = false;
  persons: PersonModel[];
  recipeSelect: number = 0;
  recipeForm: FormGroup;
  recipe: RecipeModel;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit(): void {
    const personmodel  = <PersonModel[]>this.activatedRoute.snapshot.data['persons'];
    if(personmodel){
        this.persons = personmodel;
    }
    this.recipe  = <RecipeModel>this.activatedRoute.snapshot.data['recipe'];
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isRecipeUpdated = this.activatedRoute.snapshot.data['update'];
    this.createForm();
  }

  
  createForm() {
    let recipe: RecipeModel = new RecipeModel();
   if(recipe.dignostic === ''){
    recipe = <RecipeModel>this.recipe
   }
   this.recipeForm = this.inputFB.group({
    date: [{ value: this.recipe.date, disabled: this.readOnly }, [Validators.required]],
    dignostic: [{ value: this.recipe.dignostic, disabled: this.readOnly }, [Validators.required]],
    TA: [{ value: this.recipe.TA, disabled: this.readOnly }, [Validators.required]],
    FC: [{ value: this.recipe.FC, disabled: this.readOnly }, [Validators.required]],
    FR: [{ value: this.recipe.FR, disabled: this.readOnly }, [Validators.required]],
    T: [{ value: this.recipe.T, disabled: this.readOnly }, [Validators.required]], 
    dateExp: [{ value: this.recipe.dateExp, disabled: this.readOnly }, [Validators.required]],
    status: [{ value: this.recipe.status, disabled: this.readOnly }, [Validators.required]],
  
  });

}

  saveChanges(): void {
    if (this.isRecipeUpdated) {
      this.updateRecipe();
    } else {
      this.addRecipe();
    }
  }

  addRecipe(): void {
    this.recipeService.create(this.getRecipe).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
    this._snackBar.open('Registrado farmacia ', 'Cerrar', {
      duration: 2000,
    });
    this.router.navigate(['/services']);
    });
  }

  updateRecipe() {
    this.recipeService.update(this.updatedRecipe).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this._snackBar.open('farmacia Actualizado', 'Cerrar', {
        duration: 2000,
      });
      this.router.navigate(['/services']);
    });
  }

  get getRecipe() {
    const provControl = this.recipeForm.controls;
    const recipe: IRecipe = {
      date: provControl.date.value,
      dignostic: provControl.dignostic.value,
      TA: provControl.TA.value,
      FC: provControl.FC.value,
      FR: provControl.FR.value,
      T: provControl.T.value,
      dateExp: provControl.dateExp.value,
      status: provControl.status.value,
    };
    return recipe;
  }
  get updatedRecipe(): RecipeModel {
    const provControl = this.recipeForm.controls;
    this.recipe.date = provControl.date.value;
    this.recipe.dignostic = provControl.grade.value;
    this.recipe.TA = provControl.university.value;
    this.recipe.FC = provControl.FC.value;
    this.recipe.FR = provControl.FR.value;
    this.recipe.T = provControl.T.value;
    this.recipe.dateExp = provControl.dateExp.value;
    this.recipe.status = provControl.status.value;

    return this.recipe;
  }

  onSelect(event: MatOptionSelectionChange) {
    this.recipeSelect = event.source.value;
    this.recipeForm.controls.person.setValue(event.source.viewValue);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
