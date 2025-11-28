import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Foro } from '../../../models/foro.model';
import { ForoService } from '../../../services/foro-service';

@Component({
  selector: 'app-foro-listar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './foro-listar.html',
  styleUrls: ['./foro-listar.css'],
})
export class ForoListar {
  foros: Foro[] = [];

  constructor(private fS: ForoService) {}

  ngOnInit(): void {
    this.cargarForos();
    this.fS.getList().subscribe(data => this.foros = data);
  }

  cargarForos() {
    this.fS.list().subscribe(data => this.foros = data);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este foro?')) {
      this.fS.delete(id).subscribe({
        next: () => {
          this.cargarForos();
          alert('Eliminado exitosamente');
        },
        error: () => alert('Error a eliminar')
      });
    }
  }
}
