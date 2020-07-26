import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { PersonModel } from '../models/person.model';
import { PersonService } from '../services/person.service';

@Injectable()
export class PersonResolver implements Resolve<PersonModel> {
  constructor(private personService: PersonService) { }

  resolve(route: ActivatedRouteSnapshot): PersonModel | Observable<PersonModel> | Promise<PersonModel> {
    if (route.paramMap.get('id') === null) {
      console.log(1);
      return new PersonModel();
    } else {
      const id = route.paramMap.get('id');
      return this.personService.findOne(id);
    }
  }
}
