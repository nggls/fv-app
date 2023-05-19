import { Component, OnInit } from '@angular/core';
import { Producto } from '../pedidos/models/producto';
import { ProductoService } from './producto.service';
import swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  constructor(private productoService: ProductoService, public authService: AuthService,
    public activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.productoService.getProductos().subscribe(
        productos => this.productos = productos
      );
    }

      delete(producto: Producto): void {
        swal({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar al producto ${producto.nombre}?`,
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

            this.productoService.delete(producto.id).subscribe(
              () => {
                this.productos = this.productos.filter(pro => pro !== producto)
                swal(
                  'Producto Eliminado!',
                  `Producto ${producto.nombre} eliminado con éxito.`,
                  'success'
                )
              }
            )

          }
        });
      }
}
