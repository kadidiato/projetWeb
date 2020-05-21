import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from "./Components/sign-in/sign-in.component";
import {SignUpComponent} from "./Components/sign-up/sign-up.component";
import {ForgotPasswordComponent} from "./Components/forgot-password/forgot-password.component";
import {ListCoursComponent} from "./Components/list-cours/list-cours.component";
import {DisponibiliteComponent} from "./Components/disponibilite/disponibilite.component";
import {DetailCourComponent} from "./Components/list-cours/detail-cour/detail-cour.component";
import {ProfilComponent} from "./Components/profil/profil.component";
import {CourEleveComponent} from "./Components/cour-eleve/cour-eleve.component";
import {canActivate} from "@angular/fire/auth-guard";
import {AuthGuard} from "./Service/auth.guard";


const routes: Routes = [
  {path: '', redirectTo: 'listCours', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'forgot-password', component: ForgotPasswordComponent},
  // { path: 'verify-email-address', component: VerifyEmailComponent },
  {path: 'listCours', component: ListCoursComponent, canActivate: [AuthGuard]},
  {path: 'listCours/details/:id', component: DetailCourComponent, canActivate: [AuthGuard]},
  // {path: 'ajoutcours', component: AjoutCoursComponent },
  {path: 'disponibilite', component: DisponibiliteComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'Cours', component: CourEleveComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
