import { Component,OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Foro } from '../../../models/foro.model';
import { ForoService } from '../../../services/foro-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-foro-insertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './foro-insertar.html',
  styleUrl: './foro-insertar.css',
})
export class ForoInsertar {
  form: FormGroup = new FormGroup({});
  foro: Foro = new Foro();
  
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private fS: ForoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
      idUsuario: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
    });
  }
    aceptar(): void {
    if (this.form.valid) {
      this.foro.idForo = this.form.value.codigo;
      this.foro.titulo = this.form.value.titulo;
      this.foro.contenido = this.form.value.contenido;
      this.foro.fechaPublicacion = this.form.value.fecha;
      this.foro.idUsuario = this.form.value.idUsuario;
      this.foro.nombreUsuario = this.form.value.nombreUsuario;

      if (this.edicion) {
        this.fS.update(this.foro).subscribe(() => {
          this.fS.list().subscribe(data => this.fS.setList(data));
        });
      } else {
        this.fS.insert(this.foro).subscribe(() => {
          this.fS.list().subscribe(data => this.fS.setList(data));
        });
      }

      this.router.navigate(['foro']);
    }
  }
  
  init() {
    if (this.edicion) {
      this.fS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idForo),
          titulo: new FormControl(data.titulo),
          contenido: new FormControl(data.contenido),
          fecha: new FormControl(data.fechaPublicacion),
          idUsuario: new FormControl(data.idUsuario),
          nombreUsuario: new FormControl(data.nombreUsuario),
        });
      });
    }
  }
}
