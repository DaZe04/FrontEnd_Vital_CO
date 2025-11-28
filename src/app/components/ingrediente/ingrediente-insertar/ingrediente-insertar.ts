import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IngredienteService } from '../../../services/ingredienteservice-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ingrediente-insertar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatCardModule
  ],
  templateUrl: './ingrediente-insertar.html',
  styleUrls: ['./ingrediente-insertar.css'],
})
export class IngredienteInsertarComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      grasas: [0, [Validators.required, Validators.min(0)]],
      calorias: [0, [Validators.required, Validators.min(0)]],
      azucares: [0, [Validators.required, Validators.min(0)]],
      carbohidratos: [0, [Validators.required, Validators.min(0)]],
      proteinas: [0, [Validators.required, Validators.min(0)]],
    });
  }

  registrar() {
    if (this.form.valid) {
      this.ingredienteService.insertar(this.form.value).subscribe(() => {
        this.router.navigate(['/menu/ingrediente/listar']);
      });
    }
  }
}
