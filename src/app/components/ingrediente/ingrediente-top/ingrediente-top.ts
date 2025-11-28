import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { IngredienteService } from '../../../services/ingredienteservice-service';
import { IngredienteCalorias } from '../../../models/ingrediente-calorias.model';

@Component({
  selector: 'app-ingrediente-top',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './ingrediente-top.html',
  styleUrls: ['./ingrediente-top.css']
})
export class IngredienteTopComponent implements OnInit {
  data: IngredienteCalorias[] = [];
  displayedColumns = ['nombre', 'totalCalorias'];
  maxCal = 0;

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.ingredienteService.topCalorias().subscribe(data => {
      this.data = data;
      this.maxCal = data.reduce((max, item) => Math.max(max, item.totalCalorias), 0);
    });
  }
}
