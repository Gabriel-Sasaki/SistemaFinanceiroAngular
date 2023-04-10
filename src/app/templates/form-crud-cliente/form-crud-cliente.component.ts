import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/enumerators/color';
import { Operation } from 'src/app/enumerators/operation';
import { ICliente } from 'src/app/interfaces/cliente';
import { CepService } from 'src/app/services/cep.service';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-crud-cliente',
  templateUrl: './form-crud-cliente.component.html',
  styleUrls: ['./form-crud-cliente.component.css']
})
export class FormCrudClienteComponent implements OnInit, DoCheck {
  @Input() public operation: Operation | undefined;
  @Input() public colorSubmitBtn: Color = Color.PRIMARY;
  @Input() public colorCancelBtn: Color = Color.DANGER;
  @Input() public validateFields: boolean = true;
  @Input() public disableFields: boolean = false;
  @Input() public cpf: string | null = '';
  @Input() public disableCPF: boolean = false;

  private clientes: ICliente[] | undefined;

  endereco = new FormGroup({
    cep: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
    rua: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required)
  });

  clienteForm = new FormGroup({
    cpf: new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}$')]),
    nome: new FormControl('', Validators.required),
    telefone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}[0-9]?$')]),
    rendimentoMensal: new FormControl(0, Validators.required),
    endereco: this.endereco
  });

  constructor(private clienteService: ClienteService, private cepService: CepService) {}

  ngOnInit(): void {
    if(this.cpf) {
      this.clienteService.getClientePorCPF(this.cpf).subscribe({
        next: cliente => {
          this.clienteForm.setValue({
            cpf: cliente.cpf,
            nome: cliente.nome,
            telefone: cliente.telefone,
            rendimentoMensal: cliente.rendimentoMensal,
            endereco: {
              cep: cliente.endereco.cep,
              rua: cliente.endereco.rua,
              numero: cliente.endereco.numero
            }
          });
        },
        error: err => err
      });
    }

    this.clienteService.getClientes().subscribe({
      next: res => this.clientes = res,
      error: err => console.log(err)
    })
  }

  ngDoCheck(): void {
    let cliente = this.clientes?.find(cli => cli.cpf == this.clienteForm.value.cpf);

    if(this.operation == Operation.CADASTRAR && cliente && this.clienteForm.value.cpf) {
      Swal.fire(
        'Alerta!',
        'Esse CPF já existe cadastrado no sistema',
        'warning'
      );
      this.clienteForm.reset();
    }
  }

  submitMethod(cliente: any) {
    this.clienteService.submitForm = cliente as ICliente;
  }

  buscaEndereco() {
    const cep = this.endereco.value.cep as string;
    if(cep.length == 8 && this.operation != Operation.DELETAR) {
      this.cepService.getEndereco(cep).subscribe({
        next: endereco => {
          this.endereco.get('rua')?.setValue(endereco.logradouro);
        },
        error: err => console.log(err)
      });
    }
  }
}
