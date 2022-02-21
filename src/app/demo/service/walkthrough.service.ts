import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalkthroughServiceService {
  URL = "http://localhost:3000/processMaster";
  
  constructor(private http:HttpClient) { }
  get(){
    return this.http.get<any>('http://localhost:3000/processMaster');  
  }

  post(data:any){
    console.log("in post method in service"+data.uRef);
    return this.http.post<any>('http://localhost:3000/processMaster',data);
  }
  delete(uRef:any){
    console.log("inside delete in  walkthroughService"+ uRef);
    
    return this.http.delete<any>('http://localhost:3000/processMaster/'+uRef)
  }
  // put(uRef:string,data:Racm){
  //   return this.http.put<any>('http://localhost:3000/racm/'+uRef,data);
  // }
}
