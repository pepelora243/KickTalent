import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:any
  password:any
  error:any;
  
  constructor(public sessionService:SessionService, public router:Router) { }
  
  ngOnInit() {
  }

  login(username:string, password:string){
   
    this.sessionService.login(username,password).subscribe( user => {
    
      this.router.navigate(["/home"],user)
    });
  }

}
