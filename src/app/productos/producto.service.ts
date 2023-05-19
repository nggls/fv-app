import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Producto } from '../pedidos/models/producto';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  private urlEndPoint: string = 'http://localhost:8090/api/productos';


  constructor(private http: HttpClient,
    public router: Router,
    public authService: AuthService) { }


    getProductos(): Observable<Producto[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map(response => {
          let productos = response as Producto[];
          return productos.map(producto => {
            producto.nombre = producto.nombre;
            let datePipe = new DatePipe('es');
            producto.createAt = datePipe.transform(producto.createAt, 'fullDate');
            return producto;
          });
        }
        )
      );
    }

    createProducto(producto: Producto): Observable<Producto> {
      return this.http.post(this.urlEndPoint, producto).pipe(
        map((response: any) => response.producto as Producto),
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

    getProducto(id): Observable<Producto> {
      return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.status != 401 && e.error.mensaje) {
            this.router.navigate(['/productos']);
            console.error(e.error.mensaje);
          }
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
    }

    updateProducto(producto: Producto): Observable<Producto> {
      return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`, producto).pipe(
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
    delete(id: number): Observable<Producto> {
      return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
    }
}
