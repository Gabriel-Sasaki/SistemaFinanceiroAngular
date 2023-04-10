export interface IEmprestimo {
  id?: number,
  cpfCliente: string,
  valorInicial: number,
  valorFinal?: number,
  relacionamento: string,
  dataInicial: Date,
  dataFinal: Date
}
