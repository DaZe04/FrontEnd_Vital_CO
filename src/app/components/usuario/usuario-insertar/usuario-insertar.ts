import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario';
import { RolService } from '../../../services/rol';

import { CommonModule } from '@angular/common';              // 👈 AÑADIR ESTO

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ]
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
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      fechaNacimiento: [''],
      fechaCreacion: [''],
      fechaSuscripcion: [''],
      idRol: ['', Validators.required]
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
        this.router.navigate(['/usuario/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
