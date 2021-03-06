import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:any
  password:any
  error:any
  constructor(public sessionService:SessionService, public router:Router) { }

  ngOnInit() {
  }


  signup(username:string, password:string){
    console.log("signup....");
    console.log(username,password)
    this.sessionService.signup(username,password).subscribe( (user:any) =>{
      console.log(`WELCOME USER ${user.username}, register OK`);
      console.log(user);
      this.router.navigate(['/']);
    });
  }
}


