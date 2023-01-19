import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ControlContainer, DefaultValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
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
export class AgregarComponent implements AfterViewInit, OnInit {


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


  @ViewChild("agregarGroupContent") containerGroup!: ElementRef<HTMLDivElement>;
  @ViewChild("agregarGroupIntro") introdContainerGroup!: ElementRef<HTMLDivElement>;

  introduContent: SafeHtml[] = [];
  elementsContent: SafeHtml[] = [];



  ngAfterViewInit(): void {
  }

  /* logic form */
  formLogin: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    titulo2: new FormControl(''),
    subtitulo: new FormControl(''),
    panel: new FormControl(''),
    seccion: new FormControl(''),
    introduccion: new FormControl(''),
    contenido: new FormControl('')
  })

  /* method for router, info that fills info and form builder declaration*/
  ngOnInit(): void {
    if (this.route.url.includes("editar")) {
      this.activatedRouter.params.
        pipe(switchMap(({ id }) => this.adminService.getDataById(id)))
        .subscribe(console.log)
    } else {
      console.log("Im add ")
    }

    this.formLogin = this.formBuilder.group({
      titulo: ["s", [Validators.required]],
      titulo2: ["s", [Validators.required]],
      subtitulo: ["s", [Validators.required]],
      panel: ["s", [Validators.required]],
      seccion: ["s", [Validators.required]],
      introduccion: this.formBuilder.array([], Validators.required),
      contenido: this.formBuilder.array([], Validators.required)
    })

  }

  subtitles: FormControl = new FormControl("", Validators.required);
  imagesUrl: FormControl = new FormControl("", Validators.required);
  /* end logic form */

  /* logic add block intro and content  */

  get contentArray() {
    return this.formLogin.get("introduccion") as FormArray;
  }

  get introducArray() {
    return this.formLogin.get("contenido") as FormArray;
  }


  addContent() {

    this.functionAddHtml(this.elementsContent);
    console.log(this.elementsContent)
  }

  addIntroContent() {
    this.functionAddHtml(this.introduContent)
    console.log(this.introduContent)
  }



  send() {
    console.log(this.contentArray)

  }

  functionAddHtml(contenedor: any[]) {


    const element = `<input class="Agregar-input form-control" type="text">
    <input class="Agregar-input form-control mt-3" type="file">`;
    contenedor.push(element);
  }

  deleteElementIntro(refe: HTMLElement) {
    this.renderer.removeChild(this.introdContainerGroup.nativeElement, refe)
  }

  deleteElementContent(refe: HTMLElement) {
    this.renderer.removeChild(this.containerGroup.nativeElement, refe);
  }

  /* end methods for introduct and content */












}
