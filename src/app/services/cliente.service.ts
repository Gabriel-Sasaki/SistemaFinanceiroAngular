import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICliente } from '../interfaces/cliente';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private endpoint = 'https://sistemafinanceirospring-production.up.railway.app/api/v1';
  private resource = 'clientes';

  private _submitForm: Subject<ICliente> = new Subject();

  constructor(private http: HttpClient) { }

  get submitForm(): Observable<ICliente> {
    return this._submitForm.asObservable();
  }

  set submitForm(cliente: any) {
    this._submitForm.next(cliente);
  }

  getClientes() {
    return this.http.get<ICliente[]>(`${this.endpoint}/${this.resource}`);
  }

  getClientePorCPF(cpf: string | null) {
    return this.http.get<ICliente>(`${this.endpoint}/${this.resource}/${cpf}`);
  }

  postCliente(cliente: ICliente) {
    return this.http.post<ICliente>(`${this.endpoint}/${this.resource}`, cliente);
  }

  putCliente(cpf: string, cliente: ICliente) {
    return this.http.put<ICliente>(`${this.endpoint}/${this.resource}/${cpf}`, cliente);
  }

  deleteCliente(cpf: string) {
    return this.http.delete(`${this.endpoint}/${this.resource}/${cpf}`);
  }
}
