import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComidasService } from '../../../services/registro-comida-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registro-comidas-insertar',
  standalone: true,
  templateUrl: './registro-comida-insertar.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class RegistroComidasInsertarComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroComidaService: RegistroComidasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha_consumo: ['', Validators.required],
      notas: [''],
      id_Usuario: ['', Validators.required],
      id_Receta: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.registroComidaService.insertar(this.form.value).subscribe(() => {
        this.router.navigate(['/registro-comidas/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
