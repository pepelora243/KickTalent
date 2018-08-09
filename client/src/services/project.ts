import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
    
})
export class ProjectService {
    data;

    options:object = {withCredentials:true}
    BASE_URL: String = 'http://localhost:3000';
    constructor(private http: Http) { }

    getList() {
        return this.http
            .get(`${this.BASE_URL}/api/project`)
            .pipe(map(res => res.json()));

    }

    newProject(project) {
        console.log(project)
        return this.http
            .post(`${this.BASE_URL}/api/project`, {project})
            .pipe(map(res=> {
                console.log(`New project`,res.json())
                return res.json()
            }))
    }

    get(id) {
        return this.http
            .get(`${this.BASE_URL}/api/project/${id}`)
            .pipe(map(res=> res.json()))
    }

    apply(user,project){
        const id = user._id;
        const projectId = project;
        return this.http
            .post(`${this.BASE_URL}/api/project/apply`,{id,projectId})
            .pipe(map(res=>res.json()))
    }
    approve(projectId,userId){
        return this.http
        .get(`${this.BASE_URL}/api/project/approve/${projectId}/${userId}`,this.options)
        .pipe(map(res=> {
            return res.json()
        }))
    }
    buscar(text){
        return this.http.get(`${this.BASE_URL}/api/project/buscador/${text}`).pipe(
          map( (res:Response) => {
            this.data = res.json();
            return this.data;
          }),
          
        );
      }
    userProject(userId){
        return this.http
        .get(`${this.BASE_URL}/api/project/getUserProject/${userId}`).pipe(map(res=>{
            return res.json()
        }))
    }
    goToProfile(id){
        return this.http
        .get(`${this.BASE_URL}/api/project/gotoprofile/${id}`).pipe(map(res=>{
            return res.json()
        }))
    }

}