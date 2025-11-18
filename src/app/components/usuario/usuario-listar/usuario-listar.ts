import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/usuario.model';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './usuario-listar.html'
})
export class UsuarioListarComponent implements OnInit {

  displayedColumns = ['c1','c2','c3','c4','c5','c6','c7'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuarioService.eliminar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(u => u.idUsuario !== id);
          alert('Usuario eliminado correctamente');
        },
        error: err => {
          if (err.status === 409) {
            alert('No se puede eliminar este usuario porque está relacionado con otros registros.');
          } else {
            alert('Error al eliminar usuario.');
          }
        }
      });
    }
  }
}
