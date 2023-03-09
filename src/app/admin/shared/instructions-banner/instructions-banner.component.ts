import { Component } from '@angular/core';

interface BannerContext {
  title: string;
  description: string;
}

@Component({
  selector: 'app-instructions-banner',
  templateUrl: './instructions-banner.component.html',
  styleUrls: [],
})
export class InstructionsBannerComponent {
  infoBanner: BannerContext[] = [
    {
      title: 'Título',
      description:
        'Indica título específico sin espacios, por ejemplo : valores, procesos,faltas, tardanzas,licencias, etc.',
    },
    {
      title: 'Título 2',
      description:
        'Idéntico al título 1, solo que aquí se aceptan espacios y carácteres especiales',
    },
    {
      title: 'Subtitulo',
      description: 'Una breve descripción del título y de la sección en sí.',
    },
    {
      title: 'Panel',
      description:
        ' Es basicamente la palabra panel + el título, por ejemplo Panel Valores, Panel Faltas',
    },
    {
      title: 'Seccion',
      description:
        'Tal vez la parte más importante, permite identificar a que sección pertenece, por ejemplo: mantenimiento, registros, asistencias etc',
    },
    {
      title: 'Introducción',
      description:
        'Descripción e imagen de como llegar a la sección del título específicamente.',
    },
    {
      title: 'Contenido',
      description:
        'Descripción e imagenes de como se llevará a cabo el procedimiento de la sección.',
    },
    {
      title: 'Introducción',
      description:
        'Descripción e imagen de como llegar a la sección del título específicamente.',
    },
  ];
}
