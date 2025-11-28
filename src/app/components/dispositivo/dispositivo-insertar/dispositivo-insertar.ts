import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DispositivoService } from '../../../services/dispositivo-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dispositivo-insertar',
  standalone: true,
  templateUrl: './dispositivo-insertar.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  styleUrls: ['./dispositivo-insertar.css']
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
      tipo: ['', [Validators.required, Validators.minLength(2)]],
      marca: ['', [Validators.required, Validators.minLength(2)]],
      modelo: ['', [Validators.required, Validators.minLength(2)]],
      id_Usuario: [null, [Validators.required, Validators.min(1)]]
    });
  }

  aceptar() {
    if (this.form.valid) {
      const idUsuario = this.form.value.id_Usuario;
      const idUsuarioNum = Number(idUsuario);
      
      if (isNaN(idUsuarioNum) || idUsuarioNum <= 0) {
        alert('Por favor ingresa un ID de usuario válido');
        return;
      }
      
      // No enviamos fecha_sincronizacion - se asigna automáticamente en el backend
      const dispositivo = {
        tipo: this.form.value.tipo,
        marca: this.form.value.marca,
        modelo: this.form.value.modelo,
        id_Usuario: idUsuarioNum
      };
      
      console.log('Dispositivo a enviar:', dispositivo);
      
      this.dispositivoService.insertar(dispositivo as any).subscribe(() => {
        this.router.navigate(['/menu/dispositivo/listar']);
      });
    } else {
      console.log('Formulario inválido');
      console.log('Errores:', this.form.errors);
      Object.keys(this.form.controls).forEach(key => {
        console.log(key, this.form.get(key)?.errors);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/menu/dispositivo/listar']);
  }
}
