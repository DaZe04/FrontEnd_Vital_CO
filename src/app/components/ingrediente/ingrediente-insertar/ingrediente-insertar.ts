import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IngredienteService } from '../../../services/ingredienteservice-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ingrediente-insertar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './ingrediente-insertar.html',
})
export class IngredienteInsertarComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      grasas: ['', Validators.required],
      calorias: ['', Validators.required],
      azucares: ['', Validators.required],
      carbohidratos: ['', Validators.required],
      proteinas: ['', Validators.required],
    });
  }

  registrar() {
    if (this.form.valid) {
      this.ingredienteService.insertar(this.form.value).subscribe(() => {
        this.router.navigate(['/ingrediente/listar']);
      });
    }
  }
}
