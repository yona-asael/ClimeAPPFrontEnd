import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicModel } from '../../../../core/models/medic.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MedicService } from '../../../../core/services/medic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResolverEnums } from '../../../../core/enums/resolver.enums';
import { IMedic } from '../../../../core/interface/Medic.interface';
import { takeUntil } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PersonModel } from '../../../../core/models/person.model';

@Component({
  selector: 'app-medic-edit',
  templateUrl: './medic-edit.component.html',
  styleUrls: ['./medic-edit.component.css']
})
export class MedicEditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  readOnly: boolean;
  baseRoute = '/services';
  isMedicUpdated: boolean = false;
  persons: PersonModel[];
  medicSelect: number = 0;
  medicForm: FormGroup;
  medic: MedicModel;

  constructor(
    private medicService: MedicService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const personmodel  = <PersonModel[]>this.activatedRoute.snapshot.data['persons'];
    if(personmodel){
        this.persons = personmodel;
    }
    this.medic  = <MedicModel>this.activatedRoute.snapshot.data['medic'];
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isMedicUpdated = this.activatedRoute.snapshot.data['update'];
    this.createForm();
  }

  createForm() {
      let persons: PersonModel = new PersonModel();
        persons = <PersonModel>this.medic.person;
      if(this.readOnly === false && this.isMedicUpdated === false){  
          persons = new PersonModel();
          persons.name = '';
          persons.lastname = '';
      } 
      let value = persons.name  + persons.lastname
     this.medicForm = this.inputFB.group({
      cedP: [{ value: this.medic.cedp, disabled: this.readOnly }, [Validators.required, Validators.pattern("^[0-9]*$"), ]],
      grade: [{ value: this.medic.grade, disabled: this.readOnly }, [Validators.required]],
      university: [{ value: this.medic.university, disabled: this.readOnly }, [Validators.required]],
      person: [{ value: value, disabled: this.readOnly }, [Validators.required]],
    });
  
  }

  saveChanges(): void {
    if (this.isMedicUpdated) {
      this.updateMedic();
    } else {
      this.addMedic();
    }
  }

  addMedic(): void {
      console.log(this.getMedic)
    this.medicService.create(this.getMedic).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
    this._snackBar.open('Registrado Medico ', 'Cerrar', {
      duration: 2000,
    });
    this.router.navigate(['/services']);
    });
  }

  updateMedic() {
    this.medicService.update(this.updatedMedic).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this._snackBar.open('Medico Actualizado', 'Cerrar', {
        duration: 2000,
      });
      this.router.navigate(['/services']);
    });
  }



  get getMedic() {
    const provControl = this.medicForm.controls;
    console.log(provControl.cedP.value);
    const Medic: IMedic = {
      cedp: provControl.cedP.value,
      grade: provControl.grade.value,
      person: provControl.person.value,
      university: provControl.university.value,
    };
    return Medic;
  }
  get updatedMedic(): MedicModel {
    const provControl = this.medicForm.controls;
    this.medic.cedp = provControl.cedP.value;
    this.medic.grade = provControl.grade.value;
    this.medic.university = provControl.university.value;
    this.medic.person = provControl.person.value._id === undefined ? (<PersonModel>this.medic.person)._id : provControl.person.value._id;
    return this.medic;
  }

  onSelect(event: MatOptionSelectionChange) {
    this.medicSelect = event.source.value;
    this.medicForm.controls.person.setValue(event.source.viewValue);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
