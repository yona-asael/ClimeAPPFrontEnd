import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserModel } from '../../../app/core/models/user.model';
import { AuthService } from '../../../app/core/services/auth.service';

//import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UserModel = new UserModel();
  recordarme = false; 

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    if ( localStorage.getItem('username') ) {
      this.usuario.username = localStorage.getItem('username');
      this.recordarme = true;
    }

  }


  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    //Swal.fire({
     // allowOutsideClick: false,
     // type: 'info',
      //text: 'Espere por favor...'
    //});
  //  Swal.showLoading();


    this.auth.signUp( this.usuario )
      .subscribe( resp => {
        console.log(resp);
        //Swal.close();
        if ( this.recordarme ) {
          localStorage.setItem('username', this.usuario.username);
        }
        this.router.navigateByUrl('/home');

      }, (err) => {

        console.log(err.error.error.message);
        ///Swal.fire({
          //type: 'error',
          //title: 'Error al autenticar',
          //text: err.error.error.message
      //  });
      });
  }

}
