export interface ICliente {
  cpf: string,
  nome: string,
  telefone: string,
  rendimentoMensal: number,
  endereco: {
    rua: string,
    numero: string,
    cep: string
  }
}
