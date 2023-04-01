export interface Register {
  id?: string;
  titulo: string;
  titulo2?: string;
  subtitulo: string;
  panel: string;
  seccion: string;
  ingreso: Content[];
  contenido: Content[];
}

export interface Content {
  id?: string;
  subtitles: string;
  imagesUrl?: string;
  publicIdImage?: string;
}
