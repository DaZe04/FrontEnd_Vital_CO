import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { alertas } from '../../../models/alerta.model';
import { AlertasService } from '../../../services/alerta-service';

@Component({
  selector: 'app-alertas-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './alertas-listar.html',
  styleUrls: ['./alertas-listar.css'],
})
export class AlertasListar implements OnInit {
  dataSource: MatTableDataSource<alertas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6'];

  constructor(private dS: AlertasService) {}

  ngOnInit(): void {
    this.obtenerAlertas();
  }

  obtenerAlertas(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar esta alerta?")) {
      this.dS.delete(id).subscribe({
        next: () => {
          alert('Eliminado exitosamente');
          this.obtenerAlertas();
        },
        error: () => alert('Error a eliminar')
      });
    }
  }
}
