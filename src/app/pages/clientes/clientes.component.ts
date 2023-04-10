import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  public clientes: Array<ICliente> | any = [];

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: res => this.clientes = res,
      error: err => console.log(err)
    });
  }
}
