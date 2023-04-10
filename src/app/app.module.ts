// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EmprestimosComponent } from './pages/emprestimos/emprestimos.component';
import { ClienteCreateComponent } from './pages/clientes/cliente-create/cliente-create.component';
import { FormCrudClienteComponent } from './templates/form-crud-cliente/form-crud-cliente.component';
import { ClienteUpdateComponent } from './pages/clientes/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './pages/clientes/cliente-delete/cliente-delete.component';
import { FormCrudEmprestimoComponent } from './templates/form-crud-emprestimo/form-crud-emprestimo.component';
import { EmprestimoCreateComponent } from './pages/emprestimos/emprestimo-create/emprestimo-create.component';
import { EmprestimoDeleteComponent } from './pages/emprestimos/emprestimo-delete/emprestimo-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    ClientesComponent,
    EmprestimosComponent,
    ClienteCreateComponent,
    FormCrudClienteComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent,
    FormCrudEmprestimoComponent,
    EmprestimoCreateComponent,
    EmprestimoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
