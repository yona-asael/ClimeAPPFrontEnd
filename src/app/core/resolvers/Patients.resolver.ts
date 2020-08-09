import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { PatientModel } from '../models/patient.model';
import { PatientService } from '../services/patient.service';


@Injectable()
export class PatientsResolver implements Resolve<PatientModel[]> {
  constructor(private patientservice: PatientService) { }

  resolve(route: ActivatedRouteSnapshot): PatientModel[] | Observable<PatientModel[]> | Promise<PatientModel[]> {
    return this.patientservice.getALL();  
  }
}
