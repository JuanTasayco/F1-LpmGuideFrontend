import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
})
export class AgregarUserComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
  }

  formUser: FormGroup = new FormGroup({
    nombres: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    passwordRepeat: new FormControl("")
  });


  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      nombres: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      passwordRepeat: ["", Validators.required]
    });
  }


  send() {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
    } else {

    }


  }




}
