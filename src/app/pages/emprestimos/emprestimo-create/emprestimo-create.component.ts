import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { Operation } from './../../../enumerators/operation';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmprestimo } from 'src/app/interfaces/emprestimo';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emprestimo-create',
  templateUrl: './emprestimo-create.component.html',
  styleUrls: ['./emprestimo-create.component.css']
})
export class EmprestimoCreateComponent implements AfterViewInit, OnDestroy {
  public operation: Operation = Operation.CADASTRAR;

  private subscription: Subscription | undefined;

  constructor(private emprestimoService: EmprestimoService, private router: Router) {}

  ngAfterViewInit(): void {
    this.subscription = this.emprestimoService.submitForm.subscribe({
      next: (emprestimo: IEmprestimo) => {
        this.cadastrarEmprestimo(emprestimo);
        this.subscription?.unsubscribe();
      },
      error: (err: any) => console.log(err)
    })
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  cadastrarEmprestimo(emprestimo: IEmprestimo) {
    this.emprestimoService.postEmprestimo(emprestimo.cpfCliente, emprestimo).subscribe({
      next: () => {
        Swal.fire(
          'Sucesso!',
          'Cadastro efetuado com sucesso',
          'success'
        );
        this.router.navigate(['/emprestimos']);
      },
      error: () => {
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao tentar realizar o cadastro',
          'error'
        );
        this.router.navigate(['/emprestimos']);
      }
    });
  }
}
