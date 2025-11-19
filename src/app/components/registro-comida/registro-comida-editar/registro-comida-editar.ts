import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegistroComidasService } from '../../../services/registro-comida-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-comidas-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './registro-comida-editar.html'
})
export class RegistroComidasEditarComponent implements OnInit {

  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private registroService: RegistroComidasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id_registro: [''],
      fecha_consumo: ['', Validators.required],
      notas: [''],
      id_Usuario: ['', Validators.required],
      id_Receta: ['', Validators.required]
    });

    this.id = this.route.snapshot.params['id'];

    this.registroService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.registroService.actualizar(this.form.value).subscribe(() => {
        this.router.navigate(['/registro-comidas']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/registro-comidas']);
  }
}
