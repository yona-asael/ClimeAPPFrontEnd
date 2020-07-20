import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PersonModel } from '../../../../core/models/person.model';
import { PersonService } from '../../../../core/services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { IPerson } from '../../../../core/interface/Person.iterface';
import { ResolverEnums } from '../../../../core/enums/resolver.enums';

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css']
})
export class PersonalEditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  readOnly: boolean;
  baseRoute = '/services';
  isPersonUpdated: boolean = false;
  personForm: FormGroup;
  person: PersonModel;

  constructor(
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const personModel = <PersonModel>this.activatedRoute.snapshot.data[ResolverEnums.Person];
    if (personModel) {
      this.person = personModel;
    }
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isPersonUpdated = this.activatedRoute.snapshot.data['update'];
    this.createForm();
  }

  createForm() {
    this.personForm = this.inputFB.group({
      name: [{ value: this.person.name, disabled: this.readOnly }, [Validators.required]],
      lastname: [{ value: this.person.lastname, disabled: this.readOnly }, [Validators.required, Validators.maxLength(3)]],
      address: [{ value: this.person.address, disabled: this.readOnly }, [Validators.required]],
      cellphone: [{ value: this.person.cellphone, disabled: this.readOnly }, [Validators.required, Validators.pattern('^[0-9]*$')]],
      job: [{ value: this.person.job, disabled: this.readOnly }, [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  saveChanges(): void {
    if (this.isPersonUpdated) {
      this.updatePerson();
    } else {
      this.addPerson();
    }
  }

  addPerson(): void {
    this.personService.create(this.getPerson).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
    this._snackBar.open('Registro Personal Creado', 'Cerrar', {
      duration: 2000,
    });
    this.router.navigate(['/services']);
    });
  }

  updatePerson() {
    this.personService.update(this.updatedPerson).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this._snackBar.open('Personal Actualizado', 'Cerrar', {
        duration: 2000,
      });
      this.router.navigate(['/services']);
    });
  }


  get getPerson() {
    const provControl = this.personForm.controls;
    const person: IPerson = {
      name: provControl.name.value,
      lastname: provControl.lastname.value,
      address: provControl.address.value,
      cellphone: provControl.cellphone.value,
      job: provControl.job.value,
    };
    return person;
  }
  get updatedPerson(): PersonModel {
    const provControl = this.personForm.controls;
    this.person.name = provControl.name.value;
    this.person.lastname = provControl.lastname.value;
    this.person.address = provControl.address.value;
    this.person.cellphone = provControl.cellphone.value;
    this.person.job = provControl.job.value;
    return this.person;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
