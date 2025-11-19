import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Comentarios } from '../../../models/comentario.model';
import { ComentariosService } from '../../../services/comentario-service';

@Component({
  selector: 'app-comentarios-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './comentarios-listar.html',
  styleUrl: './comentarios-listar.css',
})
export class ComentariosListar {
  dataSource: MatTableDataSource<Comentarios> = new MatTableDataSource();
  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6'];
  constructor(private cS: ComentariosService) {}
  
  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data);
      });
    });
  }
}
