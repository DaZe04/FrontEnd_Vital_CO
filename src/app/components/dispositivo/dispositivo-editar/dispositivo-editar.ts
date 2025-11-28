import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DispositivoService } from '../../../services/dispositivo-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dispositivo-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './dispositivo-editar.html',
  styleUrls: ['./dispositivo-editar.css']
})
export class DispositivoEditarComponent implements OnInit {

  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dispositivoService: DispositivoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      id_dispositivo: [''],
      tipo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      fecha_sincronizacion: ['', Validators.required],
      id_Usuario: [null, [Validators.required, Validators.min(1)]]
    });

    this.id = this.route.snapshot.params['id'];

    this.dispositivoService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  actualizar() {
    if (this.form.valid) {
      const idUsuario = this.form.value.id_Usuario;
      const idUsuarioNum = Number(idUsuario);
      
      if (isNaN(idUsuarioNum) || idUsuarioNum <= 0) {
        alert('Por favor ingresa un ID de usuario válido');
        return;
      }
      
      const dispositivo = {
        id_dispositivo: this.form.value.id_dispositivo,
        tipo: this.form.value.tipo,
        marca: this.form.value.marca,
        modelo: this.form.value.modelo,
        fecha_sincronizacion: this.form.value.fecha_sincronizacion,
        id_Usuario: idUsuarioNum
      };
      this.dispositivoService.editar(dispositivo as any).subscribe(() => {
        this.router.navigate(['/menu/dispositivo/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/menu/dispositivo/listar']);
  }
}
