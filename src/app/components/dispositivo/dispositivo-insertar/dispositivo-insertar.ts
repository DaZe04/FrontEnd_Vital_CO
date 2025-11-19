import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DispositivoService } from '../../../services/dispositivo-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dispositivo-insertar',
  standalone: true,
  templateUrl: './dispositivo-insertar.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class DispositivoInsertarComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dispositivoService: DispositivoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      fecha_sincronizacion: ['', Validators.required],
      id_Usuario: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.dispositivoService.insertar(this.form.value).subscribe(() => {
        this.router.navigate(['/dispositivo/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
