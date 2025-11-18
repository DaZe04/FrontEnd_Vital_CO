import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Foro } from '../../../models/foro.model';
import { ForoService } from '../../../services/foro-service';

@Component({
  selector: 'app-foro-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './foro-listar.html',
  styleUrl: './foro-listar.css',
})
export class ForoListar {
  dataSource: MatTableDataSource<Foro> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private fS: ForoService) {}

  ngOnInit(): void {
    this.fS.list().subscribe(data => this.dataSource.data = data);

    this.fS.getList().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    this.fS.delete(id).subscribe(() => {
      this.fS.list().subscribe(data => this.fS.setList(data));
    });
  }
}
