import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {PatientModel} from 'app/core/models/patient.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PatientService} from 'app/core/services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IPatient} from 'app/core/interface/Patient.interface';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  readOnly: boolean;
  baseRoute = '/user';
  isPatientUpdate: boolean = false;
  patientForm: FormGroup;
  patient: PatientModel;

  constructor(
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router ,
  ) { }

  ngOnInit(): void {
    this.patient  = this.activatedRoute.snapshot.data['patient'];
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isPatientUpdate = this.activatedRoute.snapshot.data['update'];
    this.createForm();
  }

  createForm() {
     this.patientForm = this.inputFB.group({
      SEX: [{ value: this.patient.SEX, disabled: this.readOnly }, [Validators.required]],
      Date: [{ value: this.patient.Date, disabled: this.readOnly }, [Validators.required]],
      name: [{ value: this.patient.name, disabled: this.readOnly }, [Validators.required]],
      address: [{ value: this.patient.address, disabled: this.readOnly }, [Validators.required]],
      lastname: [{ value: this.patient.lastname, disabled: this.readOnly }, [Validators.required]],
      tel: [{ value: this.patient.cellphone, disabled: this.readOnly }, [Validators.required]],
    });
  
  }

  saveChanges(): void {
    if (this.isPatientUpdate) {
      this.updatePatient();
    } else {
      this.addPatient();
    }
  }

  addPatient(): void {
      this.patientService.create(this.getPatient).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
    this._snackBar.open('Paciente Registrado ', 'Cerrar', {
      duration: 2000,
    });
    this.router.navigate(['/user']);
    });
  }

  updatePatient() {
     this.patientService.update(this.updatedPatient).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this._snackBar.open('Paciente Actualizado', 'Cerrar', {
        duration: 2000,
      });
      this.router.navigate(['/user']);
    });
  }



  get getPatient() {
    const provControl = this.patientForm.controls;
    const Patient: IPatient = {
        folio: this.genFolio,
        name: provControl.name.value,
        lastname: provControl.lastname.value,
        address: provControl.address.value,
        cellphone: provControl.tel.value,
        Date: provControl.Date.value,
        SEX: provControl.SEX.value    
    };
    return Patient;
  }

  get updatedPatient(): PatientModel {
    const provControl = this.patientForm.controls;
    this.patient.folio = this.genFolio;
    this.patient.name = provControl.name.value;
    this.patient.lastname = provControl.lastname.value;
    this.patient.address = provControl.address.value;
    this.patient.cellphone = provControl.tel.value;
    this.patient.Date = provControl.Date.value;
    this.patient.SEX = provControl.SEX.value;
    return this.patient;
  }

  get genFolio(): string {
    const provControl = this.patientForm.controls;
    const name: string = provControl.name.value.substring(0, 2).toUpperCase() ;
    const lastname: string = provControl.lastname.value.substring(0, 2).toUpperCase();
    const sex: string = provControl.SEX.value.charAt(0).toUpperCase();
    const year: string = String(provControl.Date.value.getFullYear()).substring(2,4);
    const day: string = String(provControl.Date.value.getDay());
    const tel: string = String(provControl.tel.value).substring(6, 10);
    return `${name}${lastname}${sex}${year}${day}${tel}`;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
