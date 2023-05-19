import { Producto } from './producto';

export class ItemPedido {
  producto: Producto;
  kilogramos: number = 1;
  importe: number;

  public calcularImporte(): number {
    return this.kilogramos * this.producto.precio;
  }


}
