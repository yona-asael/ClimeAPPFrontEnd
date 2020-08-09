import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public medicForm: FormGroup;
  public patientForm: FormGroup;
  constructor(private inputFB: FormBuilder) {}

  ngOnInit(): void {
    this.patientForm = this.inputFB.group({
      firstCtrl: ['', Validators.required],
    });
    this.medicForm = this.inputFB.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
