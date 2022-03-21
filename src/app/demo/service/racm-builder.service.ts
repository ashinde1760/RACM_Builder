import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Racm } from '../view/racm-builder/model/racm-interface';


@Injectable({
  providedIn: 'root'
})
export class RacmBuilderService {
  

  constructor(private http:HttpClient) { }
  
  getRacmData(pname:string,id:string){
    return this.http.get<any>(`${environment.url+"/racm"}?process=${pname}&projectId=${id}`);
  }

  getProcessDataByName(pname:string,projectId:string)
  {
    
    return this.http.get<any>(`${environment.url+"/racmControlData"}?process=${pname}&projectId=${projectId}`);
  }

  addRacmData(data:any){
    console.log("in post method in service"+data.uRef);
    return this.http.post<any>('http://localhost:3000/racm',data);
  }

  delete(uRef:any){
    console.log("inside delete in service"+ uRef);
    
    return this.http.delete<any>('http://localhost:3000/racm/'+uRef)
  }

  editRacmData(uRef:string,data:Racm){
    return this.http.put<any>('http://localhost:3000/racm/'+uRef,data);
  }

  getProcessData(id:number){    
    return this.http.get<any>(`${environment.url+"/racmControlData"}?projectId=${id}`);
  }

  getRiskByName(pname:string,projectId:string,risk:string)
  {
    return this.http.get<any>(`${environment.url+"/racmControlData"}?process=${pname}&projectId=${projectId}&risk=${risk}`);
  }
}

