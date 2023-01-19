
export interface Seccion {
  id?: string,
  titulo: string,
  titulo2?: string,
  subtitulo: string,
  panel: string,
  seccion: string,
  ingreso: Content[],
  contenido: Content[]
}

export interface Content {
  subtitles: string,
  imagesUrl: string
}


/* export interface Secciones {
    asistencias: Asistencia[];
    especiales: Especiales[];
    mantenimientoPersonal: MantenimientoPersonal[];
    registros: Registro[];
  }
  
  export interface Asistencia {
    faltas?: Info;
    tardanzas?: Info;
    licencias?: Info;
    vacaciones?: Info;
  }
  
  export interface Info {
    titulo: string;
    subtitulo: string;
    panel: string;
    id: string;
    contenido: Contenido[];
  }
  
  export interface Contenido {
    subtitles: string;
    imagesUrl: string;
  }
  
  export interface Especiales {
    cts?: Info;
    gratificacion?: Info;
    rentaExterna?: Info;
  }
  
  export interface MantenimientoPersonal {
    modificar?: Info;
    ceses?: Info;
  }
  
  export interface Registro {
    adelantos?: Info;
    horasExtras?: Info;
    otrosConceptos?: Info;
    otrosIngresos?: Info;
    reporteRenta?: Info;
  }
   */