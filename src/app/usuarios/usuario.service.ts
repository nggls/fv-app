import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8090/api/usuarios';


  constructor(private http: HttpClient,
    public router: Router,
    public authService: AuthService) { }


    getUsuarios(): Observable<Usuario[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map(response => {
          let usuarios = response as Usuario[];
          return usuarios.map(usuario => {
            usuario.nombre = usuario.nombre;
            return usuario;
          });
        }
        )
      );
    }

    createUsuario(usuario: Usuario): Observable<Usuario> {
      return this.http.post(this.urlEndPoint, usuario).pipe(
        map((response: any) => response.usuario as Usuario),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
    }

    getUsuario(id): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.status != 401 && e.error.mensaje) {
            this.router.navigate(['/usuarios']);
            console.error(e.error.mensaje);
          }
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
    }

    updateUsuario(usuario: Usuario): Observable<Usuario> {
      return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario).pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
    }
    delete(id: number): Observable<Usuario> {
      return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
    }
}
