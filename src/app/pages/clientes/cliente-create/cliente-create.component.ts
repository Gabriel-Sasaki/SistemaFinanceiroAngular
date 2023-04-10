import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Color } from 'src/app/enumerators/color';
import { Operation } from 'src/app/enumerators/operation';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements AfterViewInit, OnDestroy {
  public operation: Operation = Operation.CADASTRAR;
  public colorSubmitBtn: Color = Color.PRIMARY;

  private subscription: Subscription | undefined;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngAfterViewInit(): void {
    this.subscription = this.clienteService.submitForm.subscribe({
      next: (cliente: ICliente) => {
        this.cadastrarCliente(cliente);
        this.subscription?.unsubscribe();
      },
      error: (err: any) => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  cadastrarCliente(cliente: ICliente) {
    this.clienteService.postCliente(cliente).subscribe({
      next: () => {
        Swal.fire(
          'Sucesso!',
          'Cadastro efetuado com sucesso',
          'success'
        );
        this.router.navigate(['/clientes']);
      },
      error: () => {
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao tentar realizar o cadastro',
          'error'
        );
        this.router.navigate(['/clientes']);
      }
    })
  }
}
