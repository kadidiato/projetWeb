import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./Components/sign-in/sign-in.component";
import {SignUpComponent} from "./Components/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./Components/forgot-password/forgot-password.component";
import {HistoriqueCoursComponent} from "./Components/list-cours/historique-cours.component";
import {DisponibiliteComponent} from "./Components/disponibilite/disponibilite.component";
import {DetailCourComponent} from "./Components/list-cours/detail-cour/detail-cour.component";
import {ProfilComponent} from "./Components/profil/profil.component";
import {CourEleveComponent} from "./Components/cour-eleve/cour-eleve.component";
import {AuthGuard} from "./Service/auth.guard";


const routes: Routes = [
  {path: '', redirectTo: 'cours', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'forgot-password', component: ForgotPasswordComponent},
  // { path: 'verify-email-address', component: VerifyEmailComponent },
  {path: 'historique-cours', component: HistoriqueCoursComponent, canActivate: [AuthGuard]},
  {path: 'historique-cours/details/:id', component: DetailCourComponent, canActivate: [AuthGuard]},
  // {path: 'ajoutcours', component: AjoutCoursComponent },
  {path: 'disponibilite', component: DisponibiliteComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'cours', component: CourEleveComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
