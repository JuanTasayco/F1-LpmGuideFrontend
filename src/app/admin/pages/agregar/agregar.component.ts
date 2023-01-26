import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Content, Register } from '../../interfaces/register-interface';
import { AdminService } from '../../services/admin.service';


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



  constructor(private renderer: Renderer2, private adminService: AdminService,
    private activatedRouter: ActivatedRoute, private route: Router, private formBuilder: FormBuilder) { }


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
  sectionSubscription !: Subscription;
  /* method for router, info that fills info and form builder declaration*/
  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      id: [],
      titulo: ["a", [Validators.required]],
      titulo2: ["a", [Validators.required]],
      subtitulo: ["a", [Validators.required]],
      panel: ["a", [Validators.required]],
      seccion: ["a", [Validators.required]],
      ingreso: this.formBuilder.array([], Validators.required),
      contenido: this.formBuilder.array([], Validators.required)
    })


    if (this.route.url.includes("editar")) {
      this.buttonSection = "Editar"
      this.sectionSubscription = this.activatedRouter.params.
        pipe(switchMap(({ id }) => this.adminService.getDataByIdForEdit(id)))
        .subscribe(section => {
          this.deleteAll();
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
        })

    } else {
      this.buttonSection = "Agregar";
    }

  }

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

  addIntroSection() {
    this.ingreso.push(new FormGroup({
      subtitles: new FormControl(this.contentForm.get("subtitles")?.value, Validators.required),
      imagesUrl: new FormControl(this.contentForm.get("imagesUrl")?.value)
    }));
    this.contentForm.reset();
  }

  addContenidoSection() {
    this.contenido.push(new FormGroup({
      subtitles: new FormControl(this.contentForm.get("subtitles")?.value, Validators.required),
      imagesUrl: new FormControl(this.contentForm.get("imagesUrl")?.value)
    }));
    this.contentForm.reset();
  }

  send() {
    if (this.formLogin.get("id")?.value) {
      console.log("editando")
    } else {
      console.log(this.formLogin.value);
      if (this.formLogin.valid) {
        const { id, ...rest } = this.formLogin.value;

        rest.ingreso.forEach((ing: Content) => {
          if (!ing.imagesUrl) ing.imagesUrl = "";
        });
        rest.contenido.forEach((cont: Content) => {
          if (!cont.imagesUrl) cont.imagesUrl = "";
        })

        console.log(rest)
        this.adminService.createSection(rest).subscribe(console.log);

      } else {
        console.log("no es valido")
      }
    }


  }


  deleteIntroSection(pos: number) {
    this.ingreso.removeAt(pos);
  }

  deleteContenidoSection(pos: number) {
    this.contenido.removeAt(pos);
  }

  deleteAll() {

    while (this.ingreso.controls.length !== 0) {
      this.ingreso.removeAt(0);
    }
    while (this.contenido.controls.length !== 0) {
      this.contenido.removeAt(0);
    }

  }












}
