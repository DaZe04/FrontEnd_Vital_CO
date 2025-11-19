import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DispositivoService } from '../../../services/dispositivo-service';
import { Dispositivo } from '../../../models/dispositivo.model';

import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dispositivo-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dispositivo-listar.html'
})
export class DispositivoListarComponent implements OnInit {

  displayedColumns = ['c1','c2','c3','c4','c5','c6','c7','c8'];
  dataSource: MatTableDataSource<Dispositivo> = new MatTableDataSource();

  constructor(private dispositivoService: DispositivoService) {}

  ngOnInit(): void {
    this.dispositivoService.listar().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este dispositivo?')) {
      this.dispositivoService.eliminar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(d => d.id_dispositivo !== id);
          alert('Dispositivo eliminado correctamente');
        },
        error: err => {
          if (err.status === 409) {
            alert('No se puede eliminar este dispositivo porque está relacionado con otros datos.');
          } else {
            alert('Error al eliminar el dispositivo.');
          }
        }
      });
    }
  }
}
