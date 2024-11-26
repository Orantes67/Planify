import { Time } from '@angular/common';

export interface Recordatorio {
  notificacion_id: number | null;
  titulo: string;
  contenido: string;
  fecha_hora: string;
  evento_id: number | null;
  familia_id: number | null;
  usuario_id: number | undefined;
  categoria: string;
  correo_destinatario?: string[];
}
