import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Content, Register } from '../../interfaces/register-interface';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';
import { SwalFireService } from '../../services/swal-fire.service';

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
    private swalService: SwalFireService
  ) {}

  buttonSection: string = '';
  elementsChanged: any = {};
  /* logic form */
  formLogin!: FormGroup;
  contentForm!: FormGroup;
  completeSection!: Register;

  imagenesIngreso: string[] = [];
  imagenesContenido: string[] = [];

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

    this.contentForm = this.formBuilder.group({
      subtitles: ['', Validators.required],
      imagesUrl: [''],
      publicIdImage: [''],
    });

    if (this.route.url.includes('editar')) {
      this.buttonSection = 'Editar';
      this.activatedRouter.params
        .pipe(switchMap(({ id }) => this.adminService.getDataByIdForEdit(id)))
        .subscribe((section) => {
          console.log(section);
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

          this.editInsertData(
            this.ingreso,
            this.completeSection.ingreso,
            this.imagenesIngreso
          );

          this.editInsertData(
            this.contenido,
            this.completeSection.contenido,
            this.imagenesContenido
          );

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
  editInsertData(
    formArrayName: FormArray,
    nameArrayValue: Content[],
    arrayImagenesCloudinary: string[]
  ) {
    nameArrayValue?.forEach((a) => {
      formArrayName.push(
        new FormGroup({
          subtitles: new FormControl(a.subtitles, Validators.required),
          imagesUrl: new FormControl(a.imagesUrl),
          publicIdImage: new FormControl(a.publicIdImage ?? ''),
        })
      );
      arrayImagenesCloudinary.push(<string>a.imagesUrl);
    });
  }

  get contenido() {
    return this.formLogin.get('contenido') as FormArray;
  }

  get ingreso() {
    return this.formLogin.get('ingreso') as FormArray;
  }

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

  private fileIntro!: any;
  private fileReader = new FileReader();

  introduChangeFile(event: any, valor: number | string) {
    this.fileIntro = <File>event.target.files[0];
    this.fileReader.readAsDataURL(<File>this.fileIntro);
    this.fileReader.onload = (event) => {
      this.fileIntro = <string>event.target?.result;
    };
    if (typeof valor == 'number') {
      setTimeout(() => {
        this.updateBlock(
          valor,
          this.ingreso,
          this.fileIntro,
          this.imagenesIngreso
        );
        this.fileIntro = '';
      }, 200);
    }
  }

  addIntroBlock() {
    this.imagenesIngreso.push(this.fileIntro ?? '');
    this.ingreso.push(
      this.formBuilder.group({
        subtitles: [
          this.contentForm.get('subtitles')?.value ?? '',
          Validators.required,
        ],
        imagesUrl: [this.fileIntro ?? ''],
      })
    );

    this.fileIntro = '';
    this.contentForm.reset();
  }

  private fileCont!: any;

  contentChangeFile(event: any, valor: number | string) {
    this.fileCont = event.target.files[0];
    this.fileReader.readAsDataURL(<File>this.fileCont);
    this.fileReader.onload = (event) => {
      this.fileCont = <string>event.target?.result;
    };

    if (typeof valor == 'number') {
      setTimeout(() => {
        this.updateBlock(
          valor,
          this.contenido,
          this.fileCont,
          this.imagenesContenido
        );
      }, 200);
      this.fileCont = '';
    }
  }

  addContenidoBlock() {
    this.imagenesContenido.push(this.fileCont ?? '');
    this.contenido.push(
      this.formBuilder.group({
        subtitles: [
          this.contentForm.get('subtitles')?.value ?? '',
          Validators.required,
        ],
        imagesUrl: [this.fileCont ?? ''],
      })
    );

    this.fileCont = '';
    this.contentForm.reset();
  }

  updateBlock(
    valor: number,
    array: FormArray,
    file: File | string,
    arrayBase64: string[]
  ) {
    /* logic */
    array.controls[valor].get('imagesUrl')?.setValue(file);
    arrayBase64.splice(valor, 1);
    arrayBase64.splice(valor, 0, <string>file);
  }

  /* deleteBlockContentAditional */
  deleteIntroBlock(index: number) {
    this.ingreso.removeAt(index, {
      emitEvent: true,
    });
    this.imagenesIngreso.splice(index, 1);
  }

  deleteContBlock(index: number) {
    this.contenido.removeAt(index, {
      emitEvent: true,
    });

    this.imagenesContenido.splice(index, 1);
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
    if (!this.formLogin.get('id')?.value) {
      if (this.formLogin.valid) {
        const { id, ...rest } = this.formLogin.value;

        this.adminService.createSection(rest).subscribe((resp) => {
          if (resp.val == false) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: resp.msg,
            });
          } else {
            this.formLogin.reset();
            this.swalService.changeAddSuccess().then(() => {
              this.deleteAlltoChange();
              location.reload();
            });
          }
        });
      } else {
        this.swalService.formularyNotValid().then(() => {
          this.formLogin.markAllAsTouched();
          this.contentForm.markAllAsTouched();
        });
      }

      /* problema del front al eliminar */

      /* edit */
    } else {
      /* filterElementsChanged */
      Object.keys(this.formLogin.controls).forEach((key) => {
        if (this.formLogin.get(key)?.dirty) {
          this.elementsChanged[key] = this.formLogin.get(key)?.value;
        }
      });
      console.log('elementos cambiados', this.elementsChanged);
      if (
        Object.keys(this.elementsChanged).length > 0 &&
        this.formLogin.valid
      ) {
        console.log('form actual', this.formLogin.value);
        this.activatedRouter.params
          .pipe(
            switchMap(({ id }) =>
              this.adminService.updateSection(id, this.elementsChanged)
            )
          )
          .subscribe(() => {
            this.swalService.changeEditSuccess().then(() => {
              /*  location.reload(); */
            });
          });
      } else if (this.formLogin.invalid) {
        this.swalService.formularyNotValid();
      } else {
        this.swalService.noDetectChangesForm();
      }
    }
  }

  deleteSection() {
    this.swalService.questionBeforeDelete().then((result) => {
      if (result.isConfirmed) {
        this.activatedRouter.params
          .pipe(switchMap(({ id }) => this.adminService.deleteSection(id)))
          .subscribe(() => {
            this.swalService.messageDelete().then(() => {
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

  converToBase64(file: File | string) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(<File>file);
    fileReader.onload = (event) => {
      file = <string>event.target?.result;
    };
  }
}
