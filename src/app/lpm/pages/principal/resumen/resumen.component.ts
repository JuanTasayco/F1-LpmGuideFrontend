import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

interface carsDesc {
  status: string,
  date: string,
  icon: any,
  image: string,
  text: string,
  link: string
}

interface timeLineDesc {
  status: string,
  step?: string
}

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  timelineDescription: timeLineDesc[] = [];
  cardsDescription: carsDesc[] = [];
  dateSection = new Date().getFullYear();

  ngOnInit(): void {

    this.cardsDescription = [
      {
        status: "Valores", date: `${this.dateSection}`, icon: PrimeIcons.CHECK, image: 'game-controller.jpg',
        text: "Los valores toman información de la ficha y cambios de asistencia registrados hasta antes de insertarse, si se ingresa este tipo de información después, los cambios no se harán de manera automática. "
        , link: "/lpm/principal/valores",
      },
      {
        status: "Procesos", date: `${this.dateSection}`, icon: PrimeIcons.CHECK, image: 'game-controller.jpg',
        text: "La sección de procesamiento de información toma todo lo especificado en la tabla de valores, además toma información de los cambios variables hechos al sistema (variaciones)"
        , link: "/lpm/principal/procesos"
      },
      {
        status: "Reportes", date: `${this.dateSection}`, icon: PrimeIcons.CHECK, image: 'game-controller.jpg',
        text: "Los reportes están hechos solo para mostrar la información que el sistema ya ha encapsulado y procesado previamente."
        , link: "/lpm/principal/reportes"
      }
    ]

    this.timelineDescription = [
      { status: 'Mantenimiento de personal', step: 'mantenimiento/fichas/ingresar' }, { status: 'Asistencias' },
      { status: 'Valores' }, { status: 'Ceses' }, { status: 'Registros' },
      { status: 'Procesar planilla' }, { status: 'Reportes' }
    ]
  }
}
