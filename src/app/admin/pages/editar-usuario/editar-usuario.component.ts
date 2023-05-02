import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalFireService } from '../../services/swal-fire.service';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: [],
})
export class EditarUsuarioComponent implements OnInit {
  formUser!: FormGroup;
  ngOnInit(): void {
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

    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.userService.getUserById(id)))
      .subscribe((dataUser) => {
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
            this.swalService.changeEditSuccess().then(() => {
              this.route.navigate(['/admin/usuarios']);
            });
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
  constructor(
    private formBuilder: FormBuilder,
    private swalService: SwalFireService,
    private userService: UserService,
    private route: Router,
    private activateRoute: ActivatedRoute
  ) {}
}
