import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';
import { RacmBuilderService } from '../../service/racm-builder.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class DashboardComponent implements OnInit {

  projectData:any=[];
  processData:any=[];

  constructor(private router:Router, private service:DashboardService, private racmService:RacmBuilderService) { }

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
    console.log(data.Id);
    // this.router.navigate(['/main']);

    this.racmService.getProcessData(data.Id).subscribe(
      (data)=>{
        console.log(data,"process data");
        this.processData=data;
        
      },
      (error)=>{
        alert("something went wrong..")
      }
    )

  }

  onSortChange(data:any)
  {

  }

  processAudit(data:any)
  {
    alert(data.process);
    this.router.navigate(['/main']);

  }
}
