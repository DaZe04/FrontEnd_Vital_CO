import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormControl ,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';


import { Comentarios } from '../../../models/comentario.model';
import { ComentariosService } from '../../../services/comentario-service';

@Component({
  selector: 'app-comentarios-insertar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './comentarios-insertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './comentarios-insertar.css',
})
export class ComentariosInsertar {
  form: FormGroup = new FormGroup({});
  edicion: boolean = false;
  id: number = 0;  
  comentario: Comentarios = new Comentarios();


  constructor(
    private cS: ComentariosService,
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
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
      idUsuario: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.comentario.idComentarios = this.form.value.codigo;
      this.comentario.contenido = this.form.value.contenido;
      this.comentario.fecha = this.form.value.fecha;
      this.comentario.idUsuario = this.form.value.idUsuario;
      this.comentario.nombreUsuario = this.form.value.nombreUsuario;

      if (this.edicion) {
        this.cS.update(this.comentario).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
        });
      } else {
        this.cS.insert(this.comentario).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
        });
      }

      this.router.navigate(['comentarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idComentarios),
          contenido: new FormControl(data.contenido),
          fecha: new FormControl(data.fecha),
          idUsuario: new FormControl(data.idUsuario),
          nombreUsuario: new FormControl(data.nombreUsuario),
        });
      });
    }
  }
}
