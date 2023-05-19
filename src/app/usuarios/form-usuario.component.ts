import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuarios.component.html'
})
export class FormUsuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario()
  public titulo: string = "Crear Usuario"
  public errores: string[];

  constructor(private usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.usuarioService.getUsuario(id).subscribe((usuario) => this.usuario = usuario);
      }
    });
  }

  createUsuario(): void {
    this.usuarioService.createUsuario(this.usuario)
      .subscribe(usuario => {
        this.router.navigate(['/usuarios'])
        swal('Nuevo Usuario', `El Usuario ${usuario.nombre} ha sido creado con éxito`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  updateUsuario(): void {
    console.log(this.usuario);
    this.usuarioService.updateUsuario(this.usuario)
      .subscribe(usuario => {
        this.router.navigate(['/usuarios'])
        swal('Usuario Actualizado', `Usuario ${usuario.nombre} actualizado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }
}
