import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroComidasService } from '../../../services/registro-comida-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

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
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  styleUrls: ['./registro-comida-insertar.css']
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
      fechaConsumo: ['', Validators.required],
      notas: ['', [Validators.required, Validators.minLength(3)]],
      idUsuario: ['', [Validators.required, Validators.min(1)]],
      idRecetas: ['', [Validators.required, Validators.min(1)]]
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.registroComidaService.insertar(this.form.value).subscribe(() => {
        this.router.navigate(['/menu/registrocomida/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
