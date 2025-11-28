import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IngredienteService } from '../../../services/ingredienteservice-service';
import { Ingrediente } from '../../../models/ingrediente.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ingrediente-listar',
  imports: [MatTableModule,CommonModule,MatIconModule,RouterLink,RouterModule,MatCardModule ],
  standalone: true,
  templateUrl: './ingrediente-listar.html',
  styleUrls: ['./ingrediente-listar.css'],
})
export class IngredienteListarComponent implements OnInit {

  displayedColumns = ['c1','c2','c3','c4','c5','c6','c7','c8','c9'];
  dataSource: MatTableDataSource<Ingrediente> = new MatTableDataSource();

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.ingredienteService.listar().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    if (confirm("¿Seguro que deseas eliminar este ingrediente?")) {
      this.ingredienteService.eliminar(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(i => i.idIngredientes !== id);
          alert('Eliminado exitosamente');
        },
        error: () => alert('Error a eliminar')
      });
    }
  }
}
