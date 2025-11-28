import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredienteService } from '../../../services/ingredienteservice-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ingrediente-editar',
  standalone: true,
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule,
    MatIconModule,
    MatCardModule],
  templateUrl: './ingrediente-editar.html',
  styleUrls: ['./ingrediente-editar.css'],
})
export class IngredienteEditarComponent implements OnInit {

  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ingredienteService: IngredienteService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 1) Crear formulario vacío (evita NG01052)
    this.form = this.fb.group({
      idIngredientes: [''],
      nombre: ['', Validators.required],
      grasas: ['', Validators.required],
      calorias: ['', Validators.required],
      azucares: ['', Validators.required],
      carbohidratos: ['', Validators.required],
      proteinas: ['', Validators.required],
    });

    // 2) Obtener ID desde la URL
    this.id = this.route.snapshot.params['id'];

    // 3) Llenar el formulario cuando llegue la data (patchValue evita error NG0100)
    this.ingredienteService.obtenerPorId(this.id).subscribe((data) => {
      this.form.patchValue({
        idIngredientes: data.idIngredientes,
        nombre: data.nombre,
        grasas: data.grasas,
        calorias: data.calorias,
        azucares: data.azucares,
        carbohidratos: data.carbohidratos,
        proteinas: data.proteinas,
      });
    });
  }

  actualizar() {
    if (this.form.valid) {
      this.ingredienteService.actualizar(this.form.value).subscribe(() => {
        this.router.navigate(['/menu/ingrediente/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
