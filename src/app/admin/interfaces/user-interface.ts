export interface User {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  direccion?: string;
  pais?: string;
  roles: string;
  password?: string;
  ciudad?: string;
  imagenUrl?: string;
  isActive?: boolean;
}
