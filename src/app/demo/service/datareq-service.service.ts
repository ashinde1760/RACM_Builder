import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Datareq } from '../view/data-request/datareq';


@Injectable({
  providedIn: 'root'
})
export class DatareqServiceService {

  constructor(private http:HttpClient) { }
  getDataReq(){
    return this.http.get<Datareq>('http://localhost:3000/datareq');
  }
  publishDataReq(data:Datareq){
    console.log("in post method in service"+data);
    return this.http.post<Datareq>('http://localhost:3000/datareq',data);
  }
  deleteDataReq(uRef:any){
    console.log("inside delete in service"+ uRef);
    
    return this.http.delete<any>('http://localhost:3000/datareq/'+uRef)
  }
  updateDataReq(uRef:string,data:Datareq){
    return this.http.put<any>('http://localhost:3000/datareq/'+uRef,data);
  }

}
