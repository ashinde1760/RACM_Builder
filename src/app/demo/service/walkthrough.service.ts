import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalkthroughServiceService {
  url = "http://localhost:3000/processMaster";
  
  constructor(private http:HttpClient) { }
  get(){
    return this.http.get<any>(this.url);  
  }

  post(data:any){
    console.log("in post method in service"+data.uRef);
    return this.http.post<any>(this.url,data);
  }
  delete(uRef:any){
    console.log("inside delete in  walkthroughService"+ uRef);
    
    return this.http.delete<any>(this.url+uRef)
  }
  // put(uRef:string,data:Racm){
  //   return this.http.put<any>('http://localhost:3000/racm/'+uRef,data);
  // }
}
