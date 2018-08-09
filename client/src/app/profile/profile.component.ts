import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  members = {
    approved: "",
  };
  projectId;
  username:any
  password:any
  constructor(public proj: ProjectService, public route: ActivatedRoute, public session: SessionService) {
    this.miembros();


  }

  ngOnInit() {
  }

  miembros() {
    this.route.params.subscribe((params) => {
      this.projectId = params.id
      this.proj.goToProfile(this.projectId).subscribe(e => {
        this.members = e

      })
    })
  }

}
