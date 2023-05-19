import { ItemPedido } from './item-pedido';
import { Cliente } from '../../clientes/cliente';

export class Pedido {
  id: number;
  descripcion: string;
  observacion: string;
  items: Array<ItemPedido> = [];
  cliente: Cliente;
  total: number;
  createAt: string;

  calcularGranTotal(): number {
    this.total = 0;
    this.items.forEach((item: ItemPedido) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }


}
