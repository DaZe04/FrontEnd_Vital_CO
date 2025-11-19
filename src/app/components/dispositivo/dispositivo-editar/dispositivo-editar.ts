import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DispositivoService } from '../../../services/dispositivo-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dispositivo-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './dispositivo-editar.html'
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
      id_Usuario: ['', Validators.required]
    });

    this.id = this.route.snapshot.params['id'];

    this.dispositivoService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.dispositivoService.editar(this.form.value).subscribe(() => {
        this.router.navigate(['/dispositivo/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/dispositivo/listar']);
  }
}
