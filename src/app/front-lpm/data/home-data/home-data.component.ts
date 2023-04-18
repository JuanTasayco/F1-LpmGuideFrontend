import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

export interface MiniSidenav {
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-data',
  templateUrl: './home-data.component.html',
  styleUrls: [],
})
export class HomeDataComponent implements AfterViewInit {
  @Output() emitPostEvent: EventEmitter<number> = new EventEmitter<number>();
  @ViewChildren('block') bloques!: QueryList<ElementRef>;
  dataSidenav: MiniSidenav[] = [
    {
      title: 'Interfaz',
      description: 'Menu personalizado para encontrar todo de manera rápida',
    },
    {
      title: 'Vista Previa',
      description:
        'Las imagenes de las guías tiene previsualización para tener mejor vista del contenido de estas.',
    },
    {
      title: 'Responsive ',
      description:
        'La guía es totalmente responsive, se adapta a cualquier dispositivo en el que se visualiza',
    },
    {
      title: 'Usabilidad',
      description:
        'Es de fácil acceso e intuitivo para buscar información sin necesidad de helpers adicionales',
    },
  ];

  ngAfterViewInit(): void {
    this.bloques.first.nativeElement.classList.add('activeMiniSidenav');
  }

  selectOption(pos: number, block: any) {
    this.bloques.forEach((element) => {
      element.nativeElement.classList.remove('activeMiniSidenav');
    });
    block.classList.add('activeMiniSidenav');
    this.emitPostEvent.emit(pos);
  }
}
