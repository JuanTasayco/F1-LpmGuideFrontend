import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  emailRegularExpresion: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  formLogin!: FormGroup;

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(this.emailRegularExpresion)],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get errorEmail(): string {
    const error = this.formLogin.get('email')?.errors;
    if (error?.['required']) {
      return 'Email es obligatorio';
    } else if (error?.['pattern']) {
      return 'El formato del email es incorrecto';
    } else {
      return '';
    }
  }

  get errorPassword(): string {
    const error = this.formLogin.get('password')?.errors;
    if (error?.['required']) {
      return 'Password es obligatorio';
    } else if (error?.['minlength']) {
      return 'Debe haber un mínimo de 3 carácteres';
    } else {
      return '';
    }
  }

  detectErrors(controlName: any) {
    return (
      this.formLogin.get(controlName)?.invalid &&
      this.formLogin.get(controlName)?.touched
    );
  }

  login() {
    if (this.formLogin.valid) {
      this.userService
        .loginUser(this.formLogin.value)
        .subscribe(({ valor, msg }) => {
          console.log(valor, msg);
        });
      /*   this.formLogin.reset(); */
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
}
