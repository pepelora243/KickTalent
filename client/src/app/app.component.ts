import { Component } from '@angular/core';
import { SessionService } from '../services/session';

interface UserObject{
  username:string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user:UserObject;
  constructor(private sessionService:SessionService){
  }
  
  logout(){
    this.sessionService.logout().subscribe();
  }
}
