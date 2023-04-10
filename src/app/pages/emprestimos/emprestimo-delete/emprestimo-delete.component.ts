import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Color } from 'src/app/enumerators/color';
import { Operation } from 'src/app/enumerators/operation';
import { IEmprestimo } from 'src/app/interfaces/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emprestimo-delete',
  templateUrl: './emprestimo-delete.component.html',
  styleUrls: ['./emprestimo-delete.component.css']
})
export class EmprestimoDeleteComponent implements OnInit, AfterViewInit, OnDestroy {
  public operation: Operation = Operation.DELETAR;
  public colorSubmitBtn: Color = Color.DANGER;
  public colorCancelBtn: Color = Color.PRIMARY;
  public validateFields: boolean = false;
  public disableFields: boolean = true;
  public cpf: string | null = '';
  public id: number | null = 0;

  private subscription: Subscription | undefined;

  constructor(private emprestimoService: EmprestimoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    this.subscription = this.emprestimoService.submitForm.subscribe({
      next: (emprestimo: IEmprestimo) => {
        this.deletarCliente(emprestimo);
        this.subscription?.unsubscribe();
      },
      error: (err: any) => console.log(err)
    });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deletarCliente(emprestimo: IEmprestimo) {
    this.emprestimoService.deleteEmprestimo(this.cpf as string, this.id as number).subscribe({
      next: () => {
        Swal.fire(
          'Sucesso!',
          'Deleção efetuada com sucesso',
          'success'
        );
        this.router.navigate(['/emprestimos']);
      },
      error: () => {
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao tentar realizar a deleção',
          'error'
        );
        this.router.navigate(['/emprestimos']);
      }
    });
  }
}
