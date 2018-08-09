import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project';

@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.css']
})
export class PetitionsComponent implements OnInit {

  projects:Object;

  constructor(private pr:ProjectService) { }

  ngOnInit() {
    this.pr.getList().subscribe(data => {
      this.projects = data})
  }

  approved(project,person){
    this.pr.approve(project,person).subscribe()
  }

}
