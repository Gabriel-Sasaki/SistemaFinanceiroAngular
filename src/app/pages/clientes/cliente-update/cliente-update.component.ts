import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Color } from 'src/app/enumerators/color';
import { Operation } from 'src/app/enumerators/operation';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit, AfterViewInit, OnDestroy {
  public operation: Operation = Operation.ALTERAR;
  public colorSubmitBtn: Color = Color.WARNING;
  public cliente: ICliente | undefined;
  public cpf: string | null = '';

  private subscription: Subscription | undefined;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf');
  }

  ngAfterViewInit(): void {
    this.subscription = this.clienteService.submitForm.subscribe({
      next: (cliente: ICliente) => {
        this.atualizarCliente(cliente);
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

  atualizarCliente(cliente: ICliente) {
    this.clienteService.putCliente(this.cpf as string, cliente).subscribe({
      next: () => {
        Swal.fire(
          'Sucesso!',
          'Alteração efetuada com sucesso',
          'success'
        );
        this.router.navigate(['/clientes']);
      },
      error: () => {
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao tentar realizar a alteração',
          'error'
        );
        this.router.navigate(['/clientes']);
      }
    });
  }
}
