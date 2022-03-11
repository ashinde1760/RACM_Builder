import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataWorkspaceService {

  constructor(private http:HttpClient) { }

  

  getProcessDetails(){
    console.log(localStorage.getItem('projectid'));
    return this.http.get<any>('http://localhost:3000/racmControlData');
}
}