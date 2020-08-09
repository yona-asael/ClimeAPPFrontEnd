import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { AppointModel } from '../models/appoint.model';
import {AppointService} from '../services/appoint.service';


@Injectable()
export class AppointResolver implements Resolve<AppointModel> {
  constructor(private appointSerice: AppointService) { }

  resolve(route: ActivatedRouteSnapshot): AppointModel | Observable<AppointModel> | Promise<AppointModel> {
    if (route.paramMap.get('id') === null) {
      return new AppointModel();
    } else {
      const id = route.paramMap.get('id');
      return this.appointSerice.findOne(id);
    }
  }
}
