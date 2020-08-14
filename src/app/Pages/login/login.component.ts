import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserModel } from '../../../app/core/models/user.model';
import { AuthService } from '../../../app/core/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenStorage} from 'app/core/services/token-storage.service';

//import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UserModel = new UserModel();
  recordarme = false; 
  public userForm: FormGroup;
  constructor( 
    private auth: AuthService,
    private router: Router,
    private inputFB: FormBuilder,
    private _snackBar: MatSnackBar,
    private tokenStorage: TokenStorage,
  ) { }

  ngOnInit() {

    if ( localStorage.getItem('username') ) {
      this.usuario.username = localStorage.getItem('username');
      this.recordarme = true;
    }
    this.createForm();
  }


  createForm() {
    this.userForm = this.inputFB.group({
        username: ['', [Validators.required]],
        password: ['',[Validators.required]],
    });
  }
  
  login( ) {
    const form = this.userForm.controls;
    
    if (  form.invalid ) { return; }
    this.usuario.username = form.username.value;
    this.usuario.password = form.password.value;    
    this.auth.signUp( this.usuario )
      .subscribe( resp => {
          this.tokenStorage.setAccessToken(resp.token);
          this._snackBar.open('Ingreso Exitoso', 'Cerrar', {
                duration: 2000,
            }); 
       // if ( this.recordarme ) {
        //  localStorage.setItem('username', this.usuario.username);
        //}
        this.tokenStorage.setItems('loged', true);
        this.router.navigateByUrl('/appointment');

      }, (err) => {
          this._snackBar.open('Tuvol un error elIngreso', 'Cerrar', {
                duration: 2000,
            }); 
      });
  }

}
