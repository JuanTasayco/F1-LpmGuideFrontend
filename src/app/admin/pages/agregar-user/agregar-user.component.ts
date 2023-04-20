import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from '../../interfaces/user-interface';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { SwalFireService } from '../../services/swal-fire.service';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
})
export class AgregarUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private swalService: SwalFireService
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
        password: '',
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
          .subscribe(() => {
            this.swalService.changeEditSuccess();
          });
      } else {
        this.swalService.noDetectChangesForm();
      }
    } else {
      this.swalService.formularyNotValid();
      this.formUser.markAllAsTouched();
    }
  }

  deleteUser() {
    this.swalService.questionBeforeDelete().then((result) => {
      if (result.isConfirmed) {
        this.activateRoute.params
          .pipe(switchMap(({ id }) => this.userService.deleteUser(id)))
          .subscribe(() => {
            this.swalService.messageDelete().then(() => {
              this.route.navigate(['/admin/usuarios']);
              setTimeout(() => {
                location.reload();
              }, 100);
            });
          });
      }
    });
  }
}
