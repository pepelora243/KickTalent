import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { PetitionsComponent } from './petitions/petitions.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path:'signup', component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'home/new', component:NewProjectComponent },
    {path:'home/:id', component: ProjectDetailComponent},
    {path:'petitions', component:PetitionsComponent}
]
