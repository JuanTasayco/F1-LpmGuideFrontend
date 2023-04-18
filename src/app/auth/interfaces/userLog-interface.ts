export interface UserAuth {
  id: string;
  email: string;
  nombre?: string;
  apellido?: string;
  password: string;
  token: string;
  imagenUrl?: string;
  isActive?: boolean;
}
