import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/select';
@Component({
  selector: 'app-usuario-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatOption
  ],
  templateUrl: './usuario-editar.html'
})
export class UsuarioEditarComponent implements OnInit {

  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      fechaNacimiento: [''],
      fechaCreacion: [''],
      fechaSuscripcion: [''],
      idRol: [2, Validators.required]
    });

    this.id = this.route.snapshot.params['id'];

    this.usuarioService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.usuarioService.actualizar(this.form.value).subscribe(() => {
        this.router.navigate(['/usuario/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
