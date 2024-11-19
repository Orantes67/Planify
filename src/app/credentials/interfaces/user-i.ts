import { RolI } from './rol-i';

export interface UserI {
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  correo: string;
  familia_id: number;
  contrasena: string;
  usuario_id?: number;
  roles: RolI[];
}
