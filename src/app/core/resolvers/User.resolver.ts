import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { MedicService } from '../services/medic.service';
import {UserModel} from '../models/user.model';
import {AuthService} from '../services/auth.service';

@Injectable()
export class UserResolver implements Resolve<UserModel> {
  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): UserModel | Observable<UserModel> | Promise<UserModel> {
    if (route.paramMap.get('id') === null) {
         return new UserModel();
        } else {
         const id = route.paramMap.get('id');
        return this.authService.verifyUser(id);
    }
  }
}
