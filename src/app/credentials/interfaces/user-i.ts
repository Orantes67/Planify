export interface UserI {
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  correo: string;
  rol: string;
  familia_id: number;
  contrasena: string;
  usuario_id?: number; 
}
