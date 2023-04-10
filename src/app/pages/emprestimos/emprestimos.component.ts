import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICliente } from 'src/app/interfaces/cliente';
import { IEmprestimo } from 'src/app/interfaces/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.css']
})
export class EmprestimosComponent {
  public emprestimos: IEmprestimo[] = [];

  buscaClienteForm = new FormGroup({
    cpf: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')])
  });

  constructor(private emprestimoService: EmprestimoService) {}

  buscarEmprestimoPorCPF() {
    this.emprestimoService.getEmprestimos(this.buscaClienteForm.value.cpf as string).subscribe({
      next: res => this.emprestimos = res,
      error: err => err
    })
  }
}
