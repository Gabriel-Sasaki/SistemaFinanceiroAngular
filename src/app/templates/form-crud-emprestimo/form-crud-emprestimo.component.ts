import { DatePipe, } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/enumerators/color';
import { Operation } from 'src/app/enumerators/operation';
import { IEmprestimo } from 'src/app/interfaces/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@Component({
  selector: 'app-form-crud-emprestimo',
  templateUrl: './form-crud-emprestimo.component.html',
  styleUrls: ['./form-crud-emprestimo.component.css'],
  providers: [DatePipe]
})
export class FormCrudEmprestimoComponent implements OnInit {
  @Input() public operation: Operation | undefined;
  @Input() public colorSubmitBtn: Color = Color.PRIMARY;
  @Input() public colorCancelBtn: Color = Color.DANGER;
  @Input() public validateFields: boolean = true;
  @Input() public disableFields: boolean = false;
  @Input() public cpf: string | null = '';
  @Input() public id: number | null = 0;

  emprestimoForm = new FormGroup({
    cpfCliente: new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}$')]),
    valorInicial: new FormControl(0, Validators.required),
    relacionamento: new FormControl('BRONZE', Validators.required),
    dataInicial: new FormControl(Date.now.toString(), Validators.required),
    dataFinal: new FormControl(Date.now.toString(), Validators.required)
  });

  ngOnInit(): void {
    if(this.cpf && this.id) {
      this.emprestimoService.getEmprestimoPorId(this.cpf, this.id).subscribe({
        next: (emprestimo: IEmprestimo) => {
          this.emprestimoForm.setValue({
            cpfCliente: emprestimo.cpfCliente,
            valorInicial: emprestimo.valorInicial,
            relacionamento: emprestimo.relacionamento,
            dataInicial: this.toDate(emprestimo.dataInicial),
            dataFinal: this.toDate(emprestimo.dataFinal)
          })
        },
        error: (err: any) => console.log(err)
      })
    }

    if(this.disableFields) {
      this.emprestimoForm.get('relacionamento')?.disable();
    }
  }

  constructor(private emprestimoService: EmprestimoService) {}

  submitMethod(emprestimo: any) {
    this.emprestimoService.submitForm = emprestimo as IEmprestimo;
  }

  toDate(date: Date) {
    const dateSplitted = date.toString().split('/');
    return `${dateSplitted[2]}-${dateSplitted[1]}-${dateSplitted[0]}`;
  }
}
