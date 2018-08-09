import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { SessionService } from '../services/session';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectService } from '../services/project';
import { PetitionsComponent } from './petitions/petitions.component';
import { ApprovedComponent } from './approved/approved.component';
import { FileSelectDirective } from 'ng2-file-upload';
import {VSChecklistModule} from 'ng2-vs-checklist';
import {MatCheckboxModule} from '@angular/material/checkbox';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    NewProjectComponent,
    ProjectDetailComponent,
    PetitionsComponent,
    ApprovedComponent,
    FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    VSChecklistModule,
    MatCheckboxModule,
    BrowserModule,
    MatCheckboxModule,
  ],
  providers: [SessionService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
