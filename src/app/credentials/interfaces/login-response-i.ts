export interface LoginResponseI {
  access_token: string;
  token_type: string;
  user: UserResponseI;
}

export interface UserResponseI {
  usuario_id: number;
  correo: string;
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
}
