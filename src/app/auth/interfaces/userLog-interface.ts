export interface UserAuth {
  id: string;
  email: string;
  password: string;
  token: string;
  imagenUrl?: string;
  isActive?: boolean;
}
