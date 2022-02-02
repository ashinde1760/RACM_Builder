import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RacmInterface } from '../view/racm-builder/racm-interface';


@Injectable({
  providedIn: 'root'
})
export class RacmBuilderService {

  constructor(private http:HttpClient) { }
  get(){
    return this.http.get<any>('http://localhost:3000/racm');
  }
  post(data:any){
    console.log("in post method in service"+data.uRef);
    return this.http.post<any>('http://localhost:3000/racm',data);
  }
  delete(uRef:any){
    console.log("inside delete in service"+ uRef);
    
    return this.http.delete<any>('http://localhost:3000/racm/'+uRef)
  }
  put(uRef:string,data:RacmInterface){
    return this.http.put<any>('http://localhost:3000/racm/'+uRef,data);
  }
}

