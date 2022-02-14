import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DatareqServiceService } from '../../service/datareq-service.service';

import { Datareq } from './datareq';

import Swal from 'sweetalert2';


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

  

  dataRequests: any[]=[];

  dataRequest!: Datareq;

  selecteddataRequests: Datareq[];

  submitted: boolean;
  dataReqDialog: boolean;

  cols: any[];
  newText: string;
  TextRequests: any[]=[];


  TDate: string;

  _selectedColumns:any[];
    selectedtargetDate: string;
  

 
  constructor(private dataReqService: DatareqServiceService,private confirmatonService:ConfirmationService, private messageService: MessageService) {}

  
  ngOnInit(): void {

    // this.productService.getProducts().then(data => this.dataRequests = data);
    this.dataReqService.getDataReq().subscribe(
        (data: any) => {
            this.dataRequests = data;
            console.log("from init",this.dataRequests);
            this.TextRequests = data;

            this.TextRequests.forEach(element => {
                console.log("143",element['text1']);
           
                this.newText = element['text1'];
                console.log("nnn",this.newText);
                
            });

           
            
            
        },
        (error) => {
            alert("something went wrong");
        }
    );
    

    this.cols = [{ field: 'id', header: 'id' },
      { field: 'request', header: 'Request' },
      { field: 'auditName', header: 'AuditName' },
      { field: 'assignedTo', header: 'Assigned To' },
      { field: 'targetDate', header: 'Target Date' },
      { field: 'text1', header: 'message' },
      { field: 'attachment', header: 'Attachment' }];
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

    if (this.dataRequest.request?.trim()) {
        if (this.dataRequest.id) {
            //swal fire code starts here
            this.hideDialog();
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    Swal.fire("Saved!", "", "success");
                    //Logic for Update

                    if(this.TDate===undefined)
                        {
                            this.dataRequest.targetDate =this.TDate
                        }
                        else
                        {
                            this.dataRequest.targetDate =this.TDate
                        }

                    // this.dataRequest.targetDate = this.TDate;

                    this.dataReqService
                        .updateDataReq(this.dataRequest.id, this.dataRequest)
                        .subscribe(
                            (data: any) => {
                                
                                this.ngOnInit();
                                console.log("edit method data",data);
                            },
                            (error) => {
                                alert(
                                    "Something went wrong while updating Data Request...!!"
                                );
                            }
                        );
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
        else {
           
            this.dataRequest.targetDate = this.TDate;

            this.dataReqService.publishDataReq(this.dataRequest).subscribe(
                (data: any) => {
                    
                    
                    this.ngOnInit();
                    console.log("save method data",data);
                    this.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Data Request Created Successfully",
                    });
                },
                (error) => {
                    alert(
                        "something went wrong while creating new Data Request...!!"
                    );
                }
            );
            this.dataReqDialog = false;
        }
    }
 }

 editRowData(dataRequest:Datareq){
    //this will open dialog box with the existing data prefilled and call saveData()
    this.dataRequest={ ...dataRequest};
    this.selectedtargetDate = dataRequest.targetDate;
    this.dataReqDialog=true;
  }

  deleteRowData(rowData:any){
    this.confirmatonService.confirm({
      message: 'Are You sure you want to delete "' + rowData.id + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //calling delete mothod of service and passing id to delete that entry
        this.dataReqService.deleteDataReq(rowData.id).subscribe(() => {
          });
          //this code removes the deleted row from the table on the screen only and not from db
        this.dataRequests = this.dataRequests.filter(
          (val) => val.id !== rowData.id
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Data Deleted',
        });
      },
    });
  }


 

}
