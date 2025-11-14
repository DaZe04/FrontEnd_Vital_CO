import { Usuario } from './usuario.model';

export class Alerta {
  idAlerta!: number;
  mensaje!: string;
  fecha!: string;      // yyyy-MM-dd
  idUsuario!: number;   // o solo idUsuario si en tu backend usas DTO
}