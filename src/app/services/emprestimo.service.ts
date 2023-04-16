import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IEmprestimo } from '../interfaces/emprestimo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private endpoint = 'https://sistemafinanceirospring-production.up.railway.app/api/v1/clientes';
  private resource = 'emprestimos';

  private _submitForm: Subject<IEmprestimo> = new Subject();

  constructor(private http: HttpClient) { }

  get submitForm(): Observable<IEmprestimo> {
    return this._submitForm.asObservable();
  }

  set submitForm(emprestimo: any) {
    this._submitForm.next(emprestimo);
  }

  getEmprestimos(cpf: string) {
    return this.http.get<IEmprestimo[]>(`${this.endpoint}/${cpf}/${this.resource}`);
  }

  getEmprestimoPorId(cpf: string, id: number) {
    return this.http.get<IEmprestimo>(`${this.endpoint}/${cpf}/${this.resource}/${id}`);
  }

  postEmprestimo(cpf: string, emprestimo: IEmprestimo) {
    return this.http.post<IEmprestimo>(`${this.endpoint}/${cpf}/${this.resource}`, emprestimo);
  }

  deleteEmprestimo(cpf: string, id: number) {
    return this.http.delete<IEmprestimo>(`${this.endpoint}/${cpf}/${this.resource}/${id}`);
  }
}
