import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { RolService } from '../../../services/rol-service';

import { CommonModule } from '@angular/common';              // 👈 AÑADIR ESTO

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usuario-insertar',
  standalone: true,
  templateUrl: './usuario-insertar.html',
  imports: [
    CommonModule,                 // 👈 IMPORTAR AQUÍ TAMBIÉN
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  styleUrls: ['./usuario-insertar.css']
})
export class UsuarioInsertarComponent implements OnInit {

  form!: FormGroup;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(8)]],
      fechaNacimiento: [''],
      fechaCreacion: [''],
      fechaSuscripcion: [''],
      idRol: ['', [Validators.required, Validators.min(1)]]
    });

    this.rolService.listar().subscribe({
      next: (data) => {
        console.log('ROLES RECIBIDOS DESDE BACKEND:', data);
        this.roles = data;
      },
      error: (err) => {
        console.error('ERROR AL CARGAR ROLES:', err);
      }
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usuarioService.insertar(this.form.value).subscribe(() => {
        this.router.navigate(['/menu/usuario/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
