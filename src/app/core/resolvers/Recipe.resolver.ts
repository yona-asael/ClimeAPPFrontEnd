import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { RecipeModel } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Injectable()
export class RecipeResolver implements Resolve<RecipeModel> {
  constructor(private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot): RecipeModel| Observable<RecipeModel> | Promise<RecipeModel> {
    if (route.paramMap.get('id') === null) {
        return new RecipeModel();
      } else {
        const id = route.paramMap.get('id');
        return this.recipeService.findOne(id);
      }
  }
}
