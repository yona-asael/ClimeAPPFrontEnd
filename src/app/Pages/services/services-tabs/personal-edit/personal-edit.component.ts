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
import {UserModel} from '../../../../core/models/user.model';
import {AuthService} from 'app/core/services/auth.service';
import {IUser} from 'app/core/interface/User.interface';

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
  isCreate: boolean = false;
  personForm: FormGroup;
  userForm: FormGroup;
  person: PersonModel;
  user: UserModel;

  constructor(
    private personService: PersonService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const personModel = <PersonModel>this.activatedRoute.snapshot.data['person'];
    if (personModel) {
      this.person = personModel;
    }
    const userModel = <UserModel>this.activatedRoute.snapshot.data['user'];
    if (userModel) {
        this.user = userModel;
    }else {
        this.user = new UserModel();
    }
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isPersonUpdated = this.activatedRoute.snapshot.data['update'];
    this.isCreate = this.activatedRoute.snapshot.data['create'];
    this.createForm();
    this.createUserForm();
  }

  createForm() {
    this.personForm = this.inputFB.group({
      name: [{ value: this.person.name, disabled: this.readOnly }, [Validators.required]],
      lastname: [{ value: this.person.lastname, disabled: this.readOnly }, [Validators.required]],
      address: [{ value: this.person.address, disabled: this.readOnly }, [Validators.required]],
      cellphone: [{ value: this.person.cellphone, disabled: this.readOnly }, [Validators.required, Validators.pattern('^[0-9]*$')]],
      job: [{ value: this.person.job, disabled: this.readOnly }, [Validators.required]],
      rol: [{ valie: this.person.rol, disabled: this.readOnly}],
    });
  }

  createUserForm() {
    const disabled: boolean = !(Object.keys(this.user).length === 0);
    this.userForm = this.inputFB.group({
        username: [{value: this.user.username, disabled: disabled}, [Validators.required]], 
        password: [{value: this.user.password, disabled: this.readOnly }, [Validators.required]]
    });
  }

  saveChanges(): void {
    if (this.isPersonUpdated) {
      this.updatePerson();
    } else {
      this.addPerson();
    }
  }

  saveUser(){
    if(Object.keys(this.user).length === 0){
        this.registerUser();
    } else {

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

   registerUser() {
     this.authService.register(this.getUser).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this._snackBar.open('Usuario registrado', 'Cerrar', {
        duration: 2000,
      });
    });
   }

   updateUser() {
     this.authService.update(this.updateUse, this.person._id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this._snackBar.open('Usuario actualizado', 'Cerrar', {
        duration: 2000,
      });
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
    this.person.rol = provControl.rol.value;
    return this.person;
  }

  get getUser(): IUser {
    const provControl = this.userForm.controls;
    const user: IUser = {
        username: provControl.username.value,
        password: provControl.password.value,
        person: this.person._id,
    }
    return user;
  }

  get updateUse(): UserModel {
    const provControl = this.userForm.controls;
    this.user.password = provControl.password.value;
    return this.user;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
