import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { MedicModel } from '../models/medic.model';
import { MedicService } from '../services/medic.service';


@Injectable()
export class MedicResolver implements Resolve<MedicModel> {
  constructor(private medicService: MedicService) { }

  resolve(route: ActivatedRouteSnapshot): MedicModel | Observable<MedicModel> | Promise<MedicModel> {
    if (route.paramMap.get('id') === null) {
      return new MedicModel();
    } else {
      const id = route.paramMap.get('id');
      return this.medicService.findOne(id);
    }
  }
}
