import { Time } from "@angular/common"

export interface Recordatorio {
    notificacion_id:number
    titulo: string
    contenido:string
    fecha_hora: string
    evento_id:number | null
    familia_id: number | null
    usuario_id: number 
    categoria: string
    correo_destinatario?: string[];
}
