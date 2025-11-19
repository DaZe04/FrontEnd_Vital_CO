import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl ,Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertasService } from '../../../services/alerta-service';
import { ActivatedRoute, Router } from '@angular/router';
import { alertas } from '../../../models/alerta.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-alertas-insertar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule,ReactiveFormsModule, MatButtonModule],
  templateUrl: './alertas-insertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./alertas-insertar.css']
})
export class AlertasInsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  alerta: alertas = new alertas();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private aS: AlertasService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idAlerta: [''],
      mensaje: ['', Validators.required],
      fecha: ['', Validators.required],
      idUsuario: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.alerta.idAlerta = this.form.value.idAlerta;
      this.alerta.mensaje = this.form.value.mensaje;
      this.alerta.fecha = this.form.value.fecha;
      this.alerta.idUsuario = this.form.value.idUsuario;

      if (this.edicion) {
        this.aS.update(this.alerta).subscribe(() => {
          this.aS.list().subscribe(data => this.aS.setList(data));
        });
      } else {
        this.aS.insert(this.alerta).subscribe(() => {
          this.aS.list().subscribe(data => this.aS.setList(data));
        });
      }

      this.router.navigate(['alertas']);
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }
}
