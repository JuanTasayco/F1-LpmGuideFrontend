import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  emailRegularExpresion: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  formulario = new FormBuilder().group({
    email: ["", [Validators.required, Validators.pattern(this.emailRegularExpresion)]],
    password: ["", [Validators.required, Validators.minLength(3)]]
  })


  get errorEmail(): string {
    const error = this.formulario.get("email")?.errors;
    if (error?.['required']) {
      return "Email es obligatorio";
    } else if (error?.['pattern']) {
      return "El formato del email es incorrecto";
    } else {
      return "";
    }
  }

  get errorPassword(): string {
    const error = this.formulario.get("password")?.errors;
    if (error?.["required"]) {
      return "Password es obligatorio"
    } else if (error?.["minlength"]) {
      return "Debe haber un mínimo de 3 carácteres"
    } else {
      return "";
    }
  }


  detectErrors(controlName: any) {
    return this.formulario.get(controlName)?.invalid && this.formulario.get(controlName)?.touched;
  }


  send() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      console.log(this.formulario.get("password")?.touched)
    } else {
      this.formulario.reset();
      console.log("felicidades se envío la información")
    }

  }

  constructor() { }

}
