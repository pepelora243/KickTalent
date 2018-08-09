import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProjectService } from '../../services/project';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project = {
    pic: "",
    approved: [],
    _id: ""
  };
  showbutton:boolean=false
  username:any
  password:any
  constructor(public projectService:ProjectService,public router:Router, public route:ActivatedRoute,public session:SessionService) {

  this.route.params.subscribe(params=> {
    this.projectService.get(params.id).subscribe(project => {
      console.log(project)
      this.project=project;

      const userApproved = this.project.approved.filter(e => e._id === session.user._id);
      if(userApproved.length == 0){
        this.showbutton=true
      }
    })
  })
   }


  ngOnInit() { }

  apply(){
    this.projectService.apply(this.session.user,this.project._id).subscribe()
    
  }

}
