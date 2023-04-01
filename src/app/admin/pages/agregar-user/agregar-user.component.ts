import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from '../../interfaces/user-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
})
export class AgregarUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}

  formUser!: FormGroup;
  users: User[] = [];
  user!: User;

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((dataUsers) => {
      this.users = dataUsers;
    });

    this.formUser = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: ['user', Validators.required],
      direccion: [''],
      pais: [''],
      ciudad: [''],
      imagenUrl: [''],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  detectProblem(name: string): boolean {
    return (
      (this.formUser.get(name)?.touched && this.formUser.get(name)?.invalid) ??
      false
    );
  }

  get emailProblemValidation(): string {
    const error = this.formUser.get('email')?.errors;
    console.log(error);
    return '';
  }

  elementsChanged: any = {};
  getInfoByUser(id: string) {
    this.elementsChanged = {};
    this.formUser.markAsPristine();
    this.route.navigate(['/admin/usuarios', id]);
    this.userService.getUserById(id).subscribe((dataUser) => {
      this.formUser.patchValue({
        id: dataUser.id,
        nombre: dataUser.nombre,
        apellido: dataUser.apellido,
        email: dataUser.email,
        direccion: dataUser.direccion,
        pais: dataUser.pais,
        roles: dataUser.roles,
        ciudad: dataUser.ciudad,
        imagenUrl: dataUser.imagenUrl,
        password: 'contraseñaEncriptada',
      });
    });
  }

  getUserClass(user: User) {
    if (user.isActive) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }

  /* sendInfoForUpdate */
  send() {
    if (this.formUser.valid) {
      Object.keys(this.formUser.controls).forEach((control) => {
        if (this.formUser.get(control)?.dirty) {
          this.elementsChanged[control] = this.formUser.get(control)?.value;
        }
      });

      if (Object.keys(this.elementsChanged).length > 0) {
        const id = this.formUser.get('id')?.value;
        this.userService
          .updateUserById(id, this.elementsChanged)
          .subscribe(console.log);
      } else {
        Swal.fire({
          title: 'No se detectaron cambios en el formulario',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
