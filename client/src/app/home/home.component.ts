import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';
import { ProjectService } from '../../services/project';

interface UserObject {
  _id:any,
  username: string,
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  ]
})
export class HomeComponent implements OnInit {

  user: UserObject;
  projectHome: any;
  searchedProjects;
  userProjects;

  constructor(private session: SessionService, private project: ProjectService) {
    this.project.getList().subscribe(data => {
      this.searchedProjects = data
    })
  }


  ngOnInit() {
    this.session.isLogged().subscribe(data=>{
      this.project.userProject(data._id).subscribe(er => {
        this.userProjects = er
        console.log(er)  
    })
    })
  }

  buscador(text) {
    console.log(text)
    if (text == '') {
      this.project.getList().subscribe(data => {
        this.projectHome = data
      })
    } else {
      this.project.buscar(text).subscribe(e => {
        this.searchedProjects = e
        console.log(this.searchedProjects)
      })
    }
  }


}
