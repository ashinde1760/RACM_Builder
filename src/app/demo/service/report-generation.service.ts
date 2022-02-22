import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportGeneration } from '../view/report-generation/model/report-generation';

@Injectable({
  providedIn: 'root'
})
export class ReportGenerationService {

  constructor(private http:HttpClient) { }
  getCompanyData()
{
  return this.http.get<any>('http://localhost:3000/pocData');
}

postData(data:any)
{
  console.log("post data called");
  return this.http.post<any>('http://localhost:3000/pocData',data);  
}
putData(id:string,data:ReportGeneration)
{
  console.log("put data called"+data.reportNum+data.clientName);

  return this.http.put<any>('http://localhost:3000/pocData/'+id,data);
}
deleteData(id:any)
{
  console.log(id);
  return this.http.delete<any>('http://localhost:3000/pocData/'+id);
  // return this.http.delete('http://localhost:3000/CompanyDetails/',id);
}
}
