import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DispositivoService } from '../../../services/dispositivo-service';
import { Dispositivo } from '../../../models/dispositivo.model';

import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dispositivo-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './dispositivo-listar.html',
  styleUrls: ['./dispositivo-listar.css']
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

  private extraerId(dispositivo: any): number | undefined {
    return dispositivo?.id_dispositivo ?? dispositivo?.idDispositivo ?? dispositivo?.id;
  }

  eliminar(dispositivo: Dispositivo | any) {
    const id = this.extraerId(dispositivo);
    if (!id) {
      alert('Error a eliminar');
      return;
    }
    if (confirm('¿Seguro que deseas eliminar este dispositivo?')) {
      this.dispositivoService.eliminar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(d => this.extraerId(d) !== id);
          alert('Eliminado exitosamente');
        },
        error: () => alert('Error a eliminar')
      });
    }
  }
}
