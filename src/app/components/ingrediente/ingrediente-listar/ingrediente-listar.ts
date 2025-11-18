import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IngredienteService } from '../../../services/ingredienteservice-service';
import { Ingrediente } from '../../../models/ingrediente.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ingrediente-listar',
  imports: [MatTableModule,CommonModule,MatIconModule,RouterLink,RouterModule   ],
  standalone: true,
  templateUrl: './ingrediente-listar.html',
})
export class IngredienteListarComponent implements OnInit {

  displayedColumns = ['c1','c2','c3','c4','c5','c6','c7','c8','c9'];

  // ✅ Declarar dataSource aquí
  dataSource: MatTableDataSource<Ingrediente> = new MatTableDataSource();

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.ingredienteService.listar().subscribe(data => {
      this.dataSource.data = data;   // ← Aquí llenas la tabla
    });
  }

  eliminar(id: number) {
    if (confirm("¿Seguro que deseas eliminar este ingrediente?")) {
      this.ingredienteService.eliminar(id).subscribe(() => {
        // actualizar tabla
        this.dataSource.data = this.dataSource.data.filter(i => i.idIngredientes !== id);
      });
    }
  }
}
