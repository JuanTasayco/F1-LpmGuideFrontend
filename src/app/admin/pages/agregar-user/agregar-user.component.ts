import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';

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
      email: ["", Validators.required, Validators.email],
      password: ["", [Validators.required, Validators.minLength(3)]],
      passwordRepeat: ["", [Validators.required]]
    });
  }

  existProblem(name: string): any {
    return this.formUser.get(name)?.touched && this.formUser.get(name)?.invalid;
  }

  get emailProblemValidation(): string {
    const error = this.formUser.get("email")?.errors;
    console.log(error);
    return "";
  }

  send() {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
    } else {

    }
  }




}
