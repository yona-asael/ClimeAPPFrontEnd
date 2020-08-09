import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PatientModel} from 'app/core/models/patient.model';
import {MatOptionSelectionChange} from '@angular/material/core';
import {MedicModel} from 'app/core/models/medic.model';
import {Router} from '@angular/router';
import {AppointService} from 'app/core/services/appoint.service';
import {IAppoint} from 'app/core/interface/Appoint.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public medicForm: FormGroup;
  public patientForm: FormGroup;
  public patient: PatientModel;
  public medic: MedicModel;
  @Input() patients: PatientModel[];
  @Input() medics: MedicModel[];

  constructor(
      private inputFB: FormBuilder,
      private router: Router,
      private appoinService: AppointService,
      private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.patientForm = this.inputFB.group({
      firstCtrl: ['', Validators.required],
    });
    this.medicForm = this.inputFB.group({
      secondCtrl: ['', Validators.required],
    });
  }

  onSelect(event: MatOptionSelectionChange) {
    this.patient = event.source.value;
    this.patientForm.controls.firstCtrl.setValue(event.source.viewValue);
  }

  onSelectMedic(event: MatOptionSelectionChange) {
    this.medic = event.source.value;
    this.medicForm.controls.secondCtrl.setValue(event.source.viewValue);
  }

  addAppoint() {
    this.appoinService.create(this.getAppoint).subscribe(res => {
    this._snackBar.open('Consulta realizada', 'Cerrar', {
        duration: 2000,
      });
      this.router.navigate(['/appointment']);
    });
  }

  get getAppoint(): IAppoint {
    const appoint: IAppoint = {
        medic: this.medic._id,
        patient: this.patient._id,
        status: false,
        date: Date.now().toString(),
    };
    return appoint;
  }

}
