import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './credentials/login/login.component';
import { RegisterComponent } from './credentials/register/register.component';
import { AppComponent } from './app.component';
//import { MisActividadesComponent } from './mis-actividades/mis-actividades.component';
import { FamilyDashboardComponent} from './family/family-dashboard/family-dashboard.component';
//import { RecordatorioComponent } from './recordatorio/recordatorio.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //{ path: 'mis-actividades', component: MisActividadesComponent, canActivate: [AuthGuard] },
  { path: 'Home', component: FamilyDashboardComponent, canActivate: [AuthGuard] },
  //{ path: 'recordator// Este guard lo crearemosio', component: RecordatorioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
