
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
