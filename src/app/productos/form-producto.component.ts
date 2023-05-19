import { Component, OnInit } from '@angular/core';
import { Producto } from '../pedidos/models/producto';
import { ProductoService } from './producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html'
})
export class FormProductoComponent implements OnInit {

  public producto: Producto = new Producto()
  public titulo: string = "Crear Producto"
  public errores: string[];

  constructor(private productoService: ProductoService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => this.producto = producto);
      }
    });
  }

  createProducto(): void {
    this.productoService.createProducto(this.producto)
      .subscribe(producto => {
        this.router.navigate(['/productos'])
        swal('Nuevo Producto', `El Producto ${producto.nombre} ha sido creado con éxito`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  updateProducto(): void {
    console.log(this.producto);
    this.productoService.updateProducto(this.producto)
      .subscribe(producto => {
        this.router.navigate(['/productos'])
        swal('Producto Actualizado', `Producto ${producto.nombre} actualizado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }
}
