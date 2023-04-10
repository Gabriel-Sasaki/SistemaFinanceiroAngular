import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EmprestimosComponent } from './pages/emprestimos/emprestimos.component';
import { ClienteCreateComponent } from './pages/clientes/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './pages/clientes/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './pages/clientes/cliente-delete/cliente-delete.component';
import { EmprestimoCreateComponent } from './pages/emprestimos/emprestimo-create/emprestimo-create.component';
import { EmprestimoDeleteComponent } from './pages/emprestimos/emprestimo-delete/emprestimo-delete.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'emprestimos',
    component: EmprestimosComponent
  },
  {
    path: 'clientes/cadastrar',
    component: ClienteCreateComponent
  },
  {
    path: 'clientes/alterar/:cpf',
    component: ClienteUpdateComponent
  },
  {
    path: 'clientes/deletar/:cpf',
    component: ClienteDeleteComponent
  },
  {
    path: 'emprestimos/cadastrar',
    component: EmprestimoCreateComponent
  },
  {
    path: 'emprestimos/deletar/:cpf/:id',
    component: EmprestimoDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
