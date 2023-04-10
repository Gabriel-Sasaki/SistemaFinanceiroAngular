import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Color } from 'src/app/enumerators/color';
import { Operation } from 'src/app/enumerators/operation';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit, AfterViewInit, OnDestroy {
  public operation: Operation = Operation.DELETAR;
  public colorSubmitBtn: Color = Color.DANGER;
  public colorCancelBtn: Color = Color.PRIMARY;
  public disableFields: boolean = true;
  public cpf: string | null = '';

  private subscription: Subscription | undefined;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf');
  }

  ngAfterViewInit(): void {
    this.subscription = this.clienteService.submitForm.subscribe({
      next: () => {
        this.deletarCliente();
      },
      error: (err: any) => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deletarCliente() {
    this.clienteService.deleteCliente(this.cpf as string).subscribe({
      next: () => {
        Swal.fire(
          'Sucesso!',
          'Deleção efetuada com sucesso',
          'success'
        );
        this.router.navigate(['/clientes']);
      },
      error: () => {
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao tentar realizar a deleção',
          'error'
        );
        this.router.navigate(['/clientes']);
      }
    });
  }
}
