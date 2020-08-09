import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { MedicModel } from '../models/medic.model';
import { MedicService } from '../services/medic.service';


@Injectable()
export class MedicsResolver implements Resolve<MedicModel[]> {
  constructor(private medicService: MedicService) { }

  resolve(route: ActivatedRouteSnapshot): MedicModel[] | Observable<MedicModel[]> | Promise<MedicModel[]> {
    return this.medicService.getALL();
  }
}
