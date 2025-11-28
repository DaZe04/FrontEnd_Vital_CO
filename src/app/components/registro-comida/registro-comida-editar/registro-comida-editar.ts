import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegistroComidasService } from '../../../services/registro-comida-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-registro-comidas-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  templateUrl: './registro-comida-editar.html',
  styleUrls: ['./registro-comida-editar.css']
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
      idRegistro: [''],
      fechaConsumo: ['', Validators.required],
      notas: ['', [Validators.required, Validators.minLength(3)]],
      idUsuario: ['', [Validators.required, Validators.min(1)]],
      idRecetas: ['', [Validators.required, Validators.min(1)]]
    });

    this.id = this.route.snapshot.params['id'];

    this.registroService.obtenerPorId(this.id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.registroService.actualizar(this.form.value).subscribe(() => {
        this.router.navigate(['/menu/registrocomida/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/menu/registrocomida/listar']);
  }
}
