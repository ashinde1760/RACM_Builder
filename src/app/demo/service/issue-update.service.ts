import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueUpdateService {

  constructor(private http:HttpClient) { }

  addIssue(data:any){
    console.log("in post method in service",data);
    return this.http.post<any>('http://localhost:3000/issueData',data);
  }

  getIssueDetails(process:string,projectId:string)
  {
    return this.http.get<any>(`${environment.url+"/issueData"}?process=${process}&projectId=${projectId}`);
  }

}
