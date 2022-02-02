import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DatareqServiceService } from '../../service/datareq-service.service';

import { Datareq } from './datareq';


@Component({
  selector: 'app-data-request',
  templateUrl: './data-request.component.html',
  styleUrls: ['./data-request.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }

  @media screen and (max-width: 960px) {
      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
          text-align: center;
      }

      :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
          display: flex;
      }
  }

`],
    providers: [MessageService, ConfirmationService]
})
export class DataRequestComponent implements OnInit {

  

  dataRequests!: Datareq[];

  dataRequest!: Datareq;

  selecteddataRequests: Datareq[];

  submitted: boolean;
  dataReqDialog: boolean;

  cols!: any[];
  text1: string;
  

 
  constructor(private dataReqService: DatareqServiceService, private messageService: MessageService) {}

  
  ngOnInit(): void {

    // this.productService.getProducts().then(data => this.dataRequests = data);
    this.dataReqService.getDataReq().subscribe(
        (data: any) => {
            this.dataRequests = data["content"];
            console.log("from init",data);
            
        },
        (error) => {
            alert("something went wrong");
        }
    );
    

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'request', header: 'Request' },
      { field: 'auditName', header: 'AuditName' },
      { field: 'assignedTo', header: 'Assigned To' },
      { field: 'targetDate', header: 'Target Date' },
      { field: 'text1', header: 'message' },
      { field: 'attachment', header: 'Attachment' }
   
  ];
  }
  openNew() {
    this.dataRequest = {};
    this.submitted = false;
    this.dataReqDialog = true;
  }

  hideDialog() {
    this.dataReqDialog = false;
    this.submitted = false;
  }

publish() {
    this.submitted = true;
    console.log("data",this.dataRequest);
   
    this.dataReqService.publishDataReq(this.dataRequest).subscribe((data)=>{
        this.ngOnInit();
        this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Data Request Created Successfully",
        });
      
    })
 }






}
