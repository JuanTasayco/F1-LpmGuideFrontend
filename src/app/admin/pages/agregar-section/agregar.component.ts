import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Content, Register } from '../../interfaces/register-interface';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

interface AddForm {
  titulo: string;
  subtitle: string;
  labelId: string;
  attribute: string;
  inputId?: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {
  formGroups: AddForm[] = [
    {
      titulo: '*Titulo',
      subtitle: '- Principal title(no usar comillas, ni espacios)',
      attribute: 'formControlName',
      labelId: 'titulo',
    },
    {
      titulo: 'Titulo 2',
      subtitle: '- Titulo adicional capitalizado (Titulo Cap..)',
      attribute: 'formControlName',
      labelId: 'titulo2',
    },
    {
      titulo: '*Subtitulo',
      subtitle: 'Descripción del concepto es cuestión',
      attribute: 'formControlName',
      labelId: 'subtitulo',
    },
    {
      titulo: '*Panel',
      subtitle: '- Panel al que pertenece ',
      attribute: 'formControlName',
      labelId: 'panel',
    },
    {
      titulo: ' *Seccion',
      subtitle: '- Sección a la que pertenece',
      attribute: 'formControlName',
      labelId: 'seccion',
    },
  ];

  constructor(
    private adminService: AdminService,
    private activatedRouter: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  buttonSection: string = '';
  elementsChanged: any = {};
  /* logic form */
  formLogin: FormGroup = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(''),
    titulo2: new FormControl(''),
    subtitulo: new FormControl(''),
    panel: new FormControl(''),
    seccion: new FormControl(''),
    ingreso: new FormArray([]),
    contenido: new FormArray([]),
  });
  completeSection!: Register;

  /* method for router, info that fills info and form builder declaration*/
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      id: [],
      titulo: ['', [Validators.required]],
      titulo2: ['', [Validators.required]],
      subtitulo: ['', [Validators.required]],
      panel: ['', [Validators.required]],
      seccion: ['', [Validators.required]],
      ingreso: this.formBuilder.array([], Validators.required),
      contenido: this.formBuilder.array([], Validators.required),
    });

    if (this.route.url.includes('editar')) {
      this.buttonSection = 'Editar';
      this.activatedRouter.params
        .pipe(switchMap(({ id }) => this.adminService.getDataByIdForEdit(id)))
        .subscribe((section) => {
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

          this.ingreso.valueChanges.subscribe((valor) => {
            this.elementsChanged['ingreso'] = valor;
          });
          this.contenido.valueChanges.subscribe((valor) => {
            this.elementsChanged['contenido'] = valor;
          });
        });
    } else {
      this.buttonSection = 'Agregar';
    }
  }

  /* Fill the arrays obtained from http request  */
  editInsertData(formArrayName: FormArray, nameArrayValue: Content[]) {
    nameArrayValue?.forEach((a) => {
      formArrayName.push(
        new FormGroup({
          subtitles: new FormControl(a.subtitles, Validators.required),
          imagesUrl: new FormControl(),
        })
      );
    });
  }

  contentForm: FormGroup = new FormGroup({
    subtitles: new FormControl('', Validators.required),
    imagesUrl: new FormControl(''),
  });

  /* getContentArrays */
  get contenido() {
    return this.formLogin.get('contenido') as FormArray;
  }

  get ingreso() {
    return this.formLogin.get('ingreso') as FormArray;
  }

  /* errorsArray */
  errorArrayIng(pos: number) {
    return this.ingreso.get(pos.toString())?.invalid;
  }

  errorArrayCont(pos: number) {
    return this.contenido.get(pos.toString())?.invalid;
  }

  /* validateErrors */
  errorForm(name: string) {
    return (
      this.formLogin.get(name)?.touched && this.formLogin.get(name)?.invalid
    );
  }

  errorContentForm(name: string) {
    return (
      this.contentForm.get(name)?.invalid && this.contentForm.get(name)?.touched
    );
  }

  formdata: FormData = new FormData();
  prevImgIngreso: string[] = [];
  prevImgContent: string[] = [];

  private fileIntro!: File | string;
  introduChangeFile(event: any) {
    this.fileIntro = event.target.files[0];
  }

  addIntroBlock() {
    this.convertToBase64(this.fileIntro).then((img: any) =>
      this.prevImgIngreso.push(img.base)
    );

    this.ingreso.push(
      new FormGroup({
        subtitles: new FormControl(
          this.contentForm.get('subtitles')?.value,
          Validators.required
        ),
        imagesUrl: new FormControl(''),
      })
    );

    this.formdata.set('imagenIntro', this.fileIntro ? this.fileIntro : '');
    const lengthArray = this.ingreso.length;

    this.ingreso
      .at(lengthArray - 1)
      .get('imagesUrl')
      ?.setValue(this.formdata.get('imagenIntro'));

    console.log(this.ingreso);

    this.fileIntro = '';
    this.contentForm.reset();
  }

  private fileCont!: File | string;
  contentChangeFile(event: any) {
    this.fileCont = event.target.files[0];
  }

  addContenidoBlock() {
    this.convertToBase64(this.fileCont).then((img: any) =>
      this.prevImgContent.push(img.base)
    );
    console.log(this.formLogin.get('contenido')?.value);
    this.formdata.append('imagenContent', this.fileCont ? this.fileCont : '');

    this.contenido.push(
      new FormGroup({
        subtitles: new FormControl(
          this.contentForm.get('subtitles'),
          Validators.required
        ),
        imagesUrl: new FormControl(''),
      })
    );
    this.fileCont = '';
    this.contentForm.reset();
  }

  /* deleteBlockContentAditional */
  deleteIntroBlock(index: number) {
    this.ingreso.removeAt(index, {
      emitEvent: true,
    });
  }

  deleteContBlock(index: number) {
    console.log(index);
    this.contenido.removeAt(index, {
      emitEvent: true,
    });
  }

  /* deleteAllToCleanBlocks */
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
    this.formdata.getAll('imagenIntro').forEach((value, index) => {});
    this.formdata.getAll('imagenContent').forEach((value) => {
      console.log(value);
    });
    console.log(this.formLogin.value);
    if (!this.formLogin.get('id')?.value) {
      console.log(this.formLogin.valid);
      if (this.formLogin.valid) {
        const { id, ...rest } = this.formLogin.value;
        /* quitar comentario para agregar a la base de datos */
        /*  this.adminService.createSection(rest).subscribe(); */

        /*   this.formLogin.reset(); */

        Swal.fire(
          'Agregado exitosamente',
          'La sección fue añadida correctamente',
          'success'
        ).then(() => {
          location.reload();
        });
      } else {
        this.formLogin.markAllAsTouched();
        this.contentForm.markAllAsTouched();
      }

      /* edit */
    } else {
      /* filterElementsChanged */
      Object.keys(this.formLogin.controls).forEach((key) => {
        if (this.formLogin.get(key)?.dirty) {
          this.elementsChanged[key] = this.formLogin.get(key)?.value;
        }
      });

      if (
        Object.keys(this.elementsChanged).length > 0 &&
        this.formLogin.valid
      ) {
        this.activatedRouter.params
          .pipe(
            switchMap(({ id }) =>
              this.adminService.updateSection(id, this.elementsChanged)
            )
          )
          .subscribe(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El cambio fue editado correctamente',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              location.reload();
            });
          });
      } else if (this.formLogin.invalid) {
        Swal.fire({
          title:
            'Este formulario no es válido, asegurate de haber llenado todos los campos',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
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
    }
  }

  deleteSection() {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Estos cambios no se podrán revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activatedRouter.params
          .pipe(switchMap(({ id }) => this.adminService.deleteSection(id)))
          .subscribe(() => {
            Swal.fire(
              'Borrado exitosamente',
              'La sección ha sido eliminada',
              'success'
            ).then(() => {
              this.route.navigate(['/admin/agregar']);
              /* timeOut permit that location before executed that navigation route*/
              setTimeout(() => {
                location.reload();
              }, 100);
            });
          });
      }
    });
  }

  async convertToBase64($event: any) {
    return new Promise((resolve, reject) => {
      try {
        if (!$event) return resolve('');
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        reject(e);
      }
    });
  }
}
