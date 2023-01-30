import { Component, OnInit, } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Content, Register } from '../../interfaces/register-interface';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';


interface AddForm {
  titulo: string,
  subtitle: string,
  labelId: string,
  attribute: string,
  inputId?: string
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {


  formGroups: AddForm[] = [
    {
      titulo: "*Titulo",
      subtitle: "- Principal title(no usar comillas, ni espacios)",
      attribute: "formControlName",
      labelId: "titulo"
    },
    {
      titulo: "Titulo 2",
      subtitle: "- Titulo adicional capitalizado (Titulo Cap..)",
      attribute: "formControlName",
      labelId: "titulo2"
    },
    {
      titulo: "*Subtitulo",
      subtitle: "Descripción del concepto es cuestión",
      attribute: "formControlName",
      labelId: "subtitulo"
    },
    {
      titulo: "*Panel",
      subtitle: "- Panel al que pertenece ",
      attribute: "formControlName",
      labelId: "panel"
    },
    {
      titulo: " *Seccion",
      subtitle: "- Sección a la que pertenece",
      attribute: "formControlName",
      labelId: "seccion"
    }

  ]

  constructor(private adminService: AdminService,
    private activatedRouter: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder) { }

  introduContent: SafeHtml[] = [];
  elementsContent: SafeHtml[] = [];
  buttonSection: string = "";

  /* logic form */
  formLogin: FormGroup = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(''),
    titulo2: new FormControl(''),
    subtitulo: new FormControl(''),
    panel: new FormControl(''),
    seccion: new FormControl(''),
    ingreso: new FormArray([]),
    contenido: new FormArray([])
  })
  completeSection !: Register;

  /* method for router, info that fills info and form builder declaration*/
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      id: [],
      titulo: ["", [Validators.required]],
      titulo2: ["", [Validators.required]],
      subtitulo: ["", [Validators.required]],
      panel: ["", [Validators.required]],
      seccion: ["", [Validators.required]],
      ingreso: this.formBuilder.array([], Validators.required),
      contenido: this.formBuilder.array([], Validators.required)
    });

    if (this.route.url.includes("editar")) {
      this.buttonSection = "Editar";
      this.activatedRouter.params.
        pipe(switchMap(({ id }) => this.adminService.getDataByIdForEdit(id)))
        .subscribe(section => {
          this.deleteAlltoChange();
          this.completeSection = section;
          this.formLogin.patchValue({
            id: this.completeSection.id,
            titulo: this.completeSection.titulo,
            titulo2: this.completeSection.titulo2,
            subtitulo: this.completeSection.subtitulo,
            panel: this.completeSection.panel,
            seccion: this.completeSection.seccion,
          });
          this.editInsertData(this.ingreso, this.completeSection.ingreso);
          this.editInsertData(this.contenido, this.completeSection.contenido);

        });
    } else {
      this.buttonSection = "Agregar";
    }
  }

  /* Fill the arrays obtained from http request  */
  editInsertData(formArrayName: FormArray, nameArrayValue: Content[]) {
    nameArrayValue?.forEach(a => {
      formArrayName.push(new FormGroup({
        subtitles: new FormControl(a.subtitles),
        imagesUrl: new FormControl("")
      }))
    })
  }

  contentForm: FormGroup = new FormGroup({
    subtitles: new FormControl(""),
    imagesUrl: new FormControl("")
  })

  get contenido() {
    return this.formLogin.get("contenido") as FormArray;
  }

  get ingreso() {
    return this.formLogin.get("ingreso") as FormArray;
  }

  errorArrayIng(pos: number) {
    return this.ingreso.get(pos.toString())?.invalid;
  }

  errorArrayCont(pos: number) {
    return this.contenido.get(pos.toString())?.invalid;
  }

  errorForm(name: string) {
    return this.formLogin.get(name)?.touched && this.formLogin.get(name)?.invalid;
  }


  addIntroBlock() {
    this.ingreso.push(new FormGroup({
      subtitles: new FormControl(this.contentForm.get("subtitles")?.value, Validators.required),
      imagesUrl: new FormControl(this.contentForm.get("imagesUrl")?.value)
    }));
    this.contentForm.reset();
  }

  addContenidoBlock() {
    this.contenido.push(new FormGroup({
      subtitles: new FormControl(this.contentForm.get("subtitles")?.value, Validators.required),
      imagesUrl: new FormControl(this.contentForm.get("imagesUrl")?.value)
    }));
    this.contentForm.reset();
  }

  deleteIntroBlock(pos: number) {
    this.ingreso.removeAt(pos);
  }

  deleteContBlock(pos: number) {
    this.contenido.removeAt(pos);
  }

  deleteAlltoChange() {
    while (this.ingreso.controls.length !== 0) {
      this.ingreso.removeAt(0);
    }
    while (this.contenido.controls.length !== 0) {
      this.contenido.removeAt(0);
    }
  }


  send() {
    /* add  */
    if (!this.formLogin.get("id")?.value) {
      if (this.formLogin.valid) {
        const { id, ...rest } = this.formLogin.value;


        this.adminService.createSection(rest).subscribe();
        this.formLogin.reset();

        Swal.fire(
          'Agregado exitosamente',
          'La sección fue añadida correctamente',
          'success'
        ).then(() => {
          location.reload();
        });

      } else {
        this.formLogin.markAllAsTouched();
      }

      /* edit */
    } else {
      let elementsChanged: any = {};
      Object.keys(this.formLogin.controls).forEach(key => {
        if (this.formLogin.get(key)?.dirty) {
          elementsChanged[key] = this.formLogin.get(key)?.value;
        } else {
          Swal.fire({
            title: 'No se han detectado cambios en el formulario',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        };
      });

      if (Object.keys(elementsChanged).length > 0) {

        this.activatedRouter.params.pipe(switchMap(({ id }) => this.adminService.updateSection(id, elementsChanged)))
          .subscribe(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El cambio fue editado correctamente',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              location.reload();
            });
          }
          )
      }
    }
  }

  deleteSection() {
    this.activatedRouter.params
      .pipe(switchMap(({ id }) => this.adminService.deleteSection(id)))
      .subscribe(() => {
        Swal.fire(
          'Borrado exitosamente',
          'La sección ha sido eliminada',
          'success'
        ).then(() => {
          this.route.navigate(["/admin/agregar"]);
          /* timeOut permit that location before executed that navigation route*/
          setTimeout(() => {
            location.reload();
          }, 100)
        })
      })
  }














}
