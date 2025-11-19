import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegistroComidasService } from '../../../services/registro-comida-service';
import { RegistroComida } from '../../../models/registro-comida.model';

import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-comida-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './registro-comida-listar.html'
})
export class RegistroComidaListarComponent implements OnInit {

  displayedColumns = ['c1','c2','c3','c4','c5','c6','c7'];
  dataSource: MatTableDataSource<RegistroComida> = new MatTableDataSource();

  constructor(private registroComidaService: RegistroComidasService) {}

  ngOnInit(): void {
    this.registroComidaService.listar().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este registro?')) {
      this.registroComidaService.eliminar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(r => r.id_registro !== id);
          alert('Registro eliminado correctamente');
        },
        error: err => {
          if (err.status === 409) {
            alert('No se puede eliminar este registro porque está relacionado con otros datos.');
          } else {
            alert('Error al eliminar el registro.');
          }
        }
      });
    }
  }
}
