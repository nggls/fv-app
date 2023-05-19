import { Component, OnInit } from '@angular/core';
import { Pedido } from './models/pedido';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { PedidoService } from './services/pedido.service';
import { Producto } from './models/producto';
import { ItemPedido } from './models/item-pedido';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html'
})
export class PedidosComponent implements OnInit {

  titulo: string = 'Nuevo Pedido';
  pedido: Pedido = new Pedido();
  public errores: string[];

  autocompleteControl = new FormControl();

  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
    public pedidoService: PedidoService,
    public router: Router,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.pedido.cliente = cliente);
    });
  
    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

    private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.pedidoService.filtrarProductos(filterValue);

  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaKilogramos(producto.id);
    } else {
      let nuevoItem = new ItemPedido();
      nuevoItem.producto = producto;
      this.pedido.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  actualizarKilogramos(id: number, event: any): void {
    let kilogramos: number = event.target.value as number;

    if (kilogramos == 0) {
      return this.eliminarItemPedido(id);
    }

    this.pedido.items = this.pedido.items.map((item: ItemPedido) => {
      if (id === item.producto.id) {
        item.kilogramos = kilogramos;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.pedido.items.forEach((item: ItemPedido) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaKilogramos(id: number): void {
    this.pedido.items = this.pedido.items.map((item: ItemPedido) => {
      if (id === item.producto.id) {
        ++item.kilogramos;
      }
      return item;
    });
  }

  eliminarItemPedido(id: number): void {
    this.pedido.items = this.pedido.items.filter((item: ItemPedido) => id !== item.producto.id);
  }

  create(pedidoForm): void {
    console.log(this.pedido);
      this.pedidoService.create(this.pedido).subscribe(pedido => {
        swal(this.titulo, `Pedido ${pedido.descripcion} creada con éxito!`, 'success');
        this.router.navigate(['/clientes']);
      });
  }

}
