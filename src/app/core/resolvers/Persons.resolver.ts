import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { MedicService } from '../services/medic.service';
import { PersonModel } from '../models/person.model';
import { PersonService } from '../services/person.service';

@Injectable()
export class PersonsResolver implements Resolve<PersonModel[]> {
  constructor(private personService: PersonService) { }

  resolve(route: ActivatedRouteSnapshot): PersonModel[] | Observable<PersonModel[]> | Promise<PersonModel[]> {
    return this.personService.getALL();
  }
}
