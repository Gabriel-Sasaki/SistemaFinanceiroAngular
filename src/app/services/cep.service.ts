import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnderecoCep } from '../interfaces/endereco';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private endpoint: string = 'https://viacep.com.br/ws';
  private resource: string = 'json';

  constructor(private http: HttpClient) { }

  getEndereco(cep: string) {
    return this.http.get<IEnderecoCep>(`${this.endpoint}/${cep}/${this.resource}`);
  }
}
