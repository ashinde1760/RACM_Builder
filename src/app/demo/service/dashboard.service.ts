import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getallProjectsData(){
    return this.http.get<any>('http://localhost:3000/projects');
  }
}
