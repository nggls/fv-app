import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuarioSeleccionado: Usuario;

  constructor(private usuarioService: UsuarioService, public authService: AuthService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }
  deleteUsuario(usuario: Usuario): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.usuarioService.delete(usuario.id).subscribe(
          () => {
            this.usuarios = this.usuarios.filter(cli => cli !== usuario)
            swal(
              'Usuario Eliminado!',
              `Usuario ${usuario.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
