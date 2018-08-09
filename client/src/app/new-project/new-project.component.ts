import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';


const {BASEURL} = environment;

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/project`,
    method: 'POST'
  });

  user:any;

  newProject = {
    user: {},
    title: "",
    description: "",
    profile: '',
    approved: [],
    petitions: [],
    selectedValue: '',
    options: [
      { id: 1, profile: "Web Developer",name:"WD"},
      { id: 2, profile: "UX/UI",name:"UX" },
      { id: 3, profile: "Marketing", name:"M"},
      { id: 4, profile: "Product Manager",name:"PM" },
      { id: 5, profile: "Business plan",name:"BP"}
    ],
  }

  public topics = [
    { value: 'Web Developer', display: 'Web Developer' },
    { value: 'UX/UI', display: 'UX/UI' },
    { value: 'Marketing', display: 'Marketing' },
    { value: 'Product Manager', display: 'Product Manager' },
    { value: 'Business plan', display: 'Business plan' },
];


username:any
password:any
  //selectedValue = null;
  constructor(public projectService: ProjectService, public router: Router, public sessionS: SessionService) {
    this.sessionS.isLogged().subscribe(user => {
      this.newProject.user = user._id
    })
  }

  ngOnInit() {
    this.user = {
      topics: [this.topics[1].value] // default to Technology
  }
   }

  submit() {
    this.uploader.onBuildItemForm = (item, form) => {
      this.newProject.profile = this.newProject.selectedValue;
      form.append('title', this.newProject.title);
      form.append('description', this.newProject.description);
      form.append('profile', this.user.topics);
      form.append('user', this.newProject.user);
    };

    this.uploader.uploadAll();
    this.uploader.onCompleteItem = () => {
      this.router.navigate(['/home']);
    };
  }



}
