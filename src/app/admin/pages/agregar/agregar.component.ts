import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ControlContainer, DefaultValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AdminService } from '../../services/admin.service';


interface AddForm {
  titulo: string,
  subtitle: string,
  labelId?: string,
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
      labelId: "titulo"
    },
    {
      titulo: "Titulo 2",
      subtitle: "- Titulo adicional capitalizado (Titulo Cap..)",
      labelId: "titulo2"
    },
    {
      titulo: "*Subtitulo",
      subtitle: "Descripción del concepto es cuestión",
      labelId: "subtitulo"
    },
    {
      titulo: "*Panel",
      subtitle: "- Panel al que pertenece ",
      labelId: "panel"
    },
    {
      titulo: " *Seccion",
      subtitle: "- Sección a la que pertenece",
      labelId: "seccion"
    },
    {
      titulo: "Introducción",
      subtitle: "- Introducción sobre como ir a la sección",
      labelId: "introduccion"
    },
    {
      titulo: "*Contenido",
      subtitle: "- Contenido, procedimientos",
      labelId: "contenido"
    },
  ]



  constructor(private renderer: Renderer2, private adminService: AdminService,
    private activatedRouter: ActivatedRoute, private route: Router, private formBuilder: FormBuilder) { }


  @ViewChild("agregarGroupContent") containerGroup!: ElementRef<HTMLDivElement>;
  @ViewChild("agregarGroupIntro") introdContainerGroup!: ElementRef<HTMLDivElement>;

  introduContent: SafeHtml[] = [];
  elementsContent: SafeHtml[] = [];

  introduCont: number = 0;
  addIntroContent() {
    this.introduCont += 1;
    const text = "- Introduccion, adicional"
    this.functionAddHtml(this.introduCont, text, this.introduContent)
  }


  ngAfterViewInit(): void {
  }

  /* logic form */
  formLogin: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    titulo2: new FormControl(''),
    subtitulo: new FormControl(''),
    panel: new FormControl(''),
    seccion: new FormControl('')
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
      titulo: ["", [Validators.required]],
      titulo2: ["", [Validators.required]],
      subtitulo: ["", [Validators.required]],
      panel: ["", [Validators.required]],
      seccion: ["", [Validators.required]],
    })



  }

  send() {

  }
  /* end logic form */




  /* logic add block intro and content  */
  contentCont: number = 0;
  addContent() {
    this.contentCont += 1;
    const text = "- Contenido, adicional"
    this.functionAddHtml(this.contentCont, text, this.elementsContent);
  }


  functionAddHtml(contador: number, text: string, contenedor: any[]) {
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
