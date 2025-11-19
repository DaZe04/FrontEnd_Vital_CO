import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { alertas } from '../../../models/alerta.model'; 
import { AlertasService } from '../../../services/alerta-service';

@Component({
  selector: 'app-alertas-listar',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './alertas-listar.html',
  styleUrl: './alertas-listar.css',
})
export class AlertasListar implements OnInit{

  dataSource: MatTableDataSource<alertas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private dS: AlertasService) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(data=>{
      this.dS.list().subscribe(data=>{
        this.dS.setList(data)
      })
    })
  }
}
