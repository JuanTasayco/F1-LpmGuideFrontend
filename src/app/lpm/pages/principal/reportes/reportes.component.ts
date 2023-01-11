import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Flujo } from 'src/app/lpm/interfaces/flujo.interface';
import { gsap } from 'gsap';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
})
export class ReportesComponent implements AfterViewInit {

  @ViewChild("reportesComponent") reportesComponent!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    gsap.from(this.reportesComponent.nativeElement, {
      opacity: 0
    });
  }

  descripciones: Flujo[] = [
    {
      title: "Periodo Reportes",
      description: "Permite indicar el periodo del reporte, solo permite del periodo actual hacia atrás",
      urlImage: "assets/Flujo-principal/Reportes/1.periodo.png"
    },
    {
      title: "Rango trabajadores",
      description: "Este campo aplica a ciertos reportes, como las boletas ya que se pueden seleccionar un solo trabajador o a todos, para este último seleccionar desde el primero al último de todos",
      urlImage: "assets/Flujo-principal/Reportes/2.rangoTrabajadores.png"
    },
    {
      title: "Cabecera",
      description: "En algunos colegios puede suceder que la planilla salga incompleta, sin cabecera, para solucionar esto seleccionamos la opción cabecera y se corregirá el error.",
      urlImage: "assets/Flujo-principal/Reportes/3.cabecera.png",

    }
  ]


  reportesConceptos: Flujo[] = [
    {
      title: "Planilla Auxiliar",
      description: "Reporte que permite sacar la planilla convencional a presentar durante el mes, este reporte no trae resumen.",
      urlImage: "assets/Flujo-principal/Reportes/10.auxiliar.png"
    },
    {
      title: "Planilla Total Auxiliar (Resumen)",
      description: "Permite sacar el resumen de la planilla auxiliar convencional",
      urlImage: "assets/Flujo-principal/Reportes/11.resumen.png"
    },
    {
      title: "Boletas de Pago (Standard)",
      description: "Reporte que permite sacar las boletas del mes, una vez que la fecha haya sido puesta en periodos.",
      urlImage: "assets/Flujo-principal/Reportes/12.boletas.png"
    },
    {
      title: "Totales / Liquidos / Ingresos y Egresos",
      description: "Reporte que permite sacar los liquídos / totales del mes.",
      urlImage: "assets/Flujo-principal/Reportes/13.totales.png"
    },
    {
      title: "Planilla Proyectada - Presupuesto",
      description: "Reporte que toma información directa de las fichas, permite reflejar los  conceptos remunerativos de los trabajadores. Puede obtener la información detallada y su resumen, ambos por separado. ",
      urlImage: "assets/Flujo-principal/Reportes/14.proyectada.png"
    },
    {
      title: "Cts presupuesto (anual)",
      description: "Reporte que toma la proyección anual en base a los montos actuales en su FICHAS. No hay forma de sacar un historico de años anteriores, los sueldos no se almacenan, solo toma información actual.",
      urlImage: "assets/Flujo-principal/Reportes/15.cts.png"
    }
  ]
}
