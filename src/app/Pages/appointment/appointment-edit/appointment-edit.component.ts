import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import {PatientModel} from 'app/core/models/patient.model';
import {MedicModel} from 'app/core/models/medic.model';
import {AppointModel} from 'app/core/models/appoint.model';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

    public readOnly: boolean;
    public isAppointUpdate: boolean;
    public patients: PatientModel[];
    public medics: MedicModel[];
    public appint: AppointModel; 
    constructor(
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isAppointUpdate = this.activatedRoute.snapshot.data['update'];
    const appointModel: AppointModel = <AppointModel>this.activatedRoute.snapshot.data['appoint'];
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
  }

}
