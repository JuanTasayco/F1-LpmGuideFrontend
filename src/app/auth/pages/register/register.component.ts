import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ValidRepeatPassService } from '../../services/valid-repeat-pass.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  emailRegularExpresion: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(
    private validatorService: ValidRepeatPassService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  formRegister!: FormGroup;

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group(
      {
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailRegularExpresion)],
        ],
        roles: ['user', Validators.required],
        direccion: [''],
        pais: ['Perú'],
        ciudad: [''],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          this.validatorService.camposIguales('password', 'confirmPassword'),
        ],
      }
    );
  }

  send() {
    if (this.formRegister.valid) {
      const { confirmPassword, ...restValues } = this.formRegister.value;
      this.userService.createUser(restValues).subscribe(console.log);
    } else {
      this.formRegister.markAllAsTouched();
    }
  }

  /* controlErrors */
  detectErrors(controlName: any) {
    return (
      this.formRegister.get(controlName)?.invalid &&
      this.formRegister.get(controlName)?.touched
    );
  }

  get errorUser(): string {
    const error = this.formRegister.get('user')?.errors;
    if (error?.['required']) {
      return 'El usuario es necesario';
    } else {
      return '';
    }
  }

  get errorEmail(): string {
    const error = this.formRegister.get('email')?.errors;
    if (error?.['required']) {
      return 'El email es necesario';
    } else if (error?.['pattern']) {
      return 'El email no tiene el formato correcto';
    } else {
      return '';
    }
  }

  get errorPassword(): string {
    const error = this.formRegister.get('password')?.errors;
    if (error?.['required']) {
      return 'El password es necesario';
    } else if (error?.['minlength']) {
      return 'El password debe tener al menos 3 caracteres';
    }
    return '';
  }

  get errorPasswordRepeat(): string {
    const error = this.formRegister.get('confirmPassword')?.errors;
    if (error?.['required']) {
      return 'El campo no puede estar vacío';
    } else if (error?.['noIguales']) {
      return 'Las contraseñas no coinciden';
    } else {
      return '';
    }
  }
}
