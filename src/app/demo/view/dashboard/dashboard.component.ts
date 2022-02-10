import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projectData:any=[];

  constructor(private router:Router, private service:DashboardService) { }

  ngOnInit(): void {
    this.service.get().subscribe(
      (data)=>{
        this.projectData=data;
        console.log(this.projectData);
      },
      (error)=>{
        alert("something went wrong on dashboard");
      }
    )
  }

  next()
  {
    this.router.navigate(['/main']);
  }

  onClick(data:any){
    this.router.navigate(['/main']);

  }
}
