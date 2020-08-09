import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

    public readOnly: boolean;
    public isAppointUpdate: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private inputFB: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //const personmodel  = <PersonModel[]>this.activatedRoute.snapshot.data['persons'];
    //if(personmodel){
        //this.persons = personmodel;
    //}
    this.readOnly = this.activatedRoute.snapshot.data['readOnly'];
    this.isAppointUpdate = this.activatedRoute.snapshot.data['update'];

  }

}
