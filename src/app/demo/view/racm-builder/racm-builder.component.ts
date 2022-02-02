import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { RacmBuilderService } from '../../service/racm-builder.service';
import { RacmInterface } from './racm-interface';

interface Risk{
  name:string;
}
interface Control{
  name:string;
}
interface ControlTypes{
  name:string;
}
interface Status{
  name:string;
}

@Component({
  selector: 'app-racm-builder',
  templateUrl: './racm-builder.component.html',
  styleUrls: ['./racm-builder.component.scss'],
  providers:[MessageService, ConfirmationService],
})
export class RacmBuilderComponent {

  cols!:any[];
  racmInterfaces!:RacmInterface[];
  racmInterface!:RacmInterface;
  dialogBox!:boolean;
  submitted!:boolean;

  riskOptions!:Risk[];
  selectedRisk!:Risk;

  controlOptions!:Control[];
  selectedControl!:Control;

  controlTypesOptions!:ControlTypes[];
  selectedControlTypes!:ControlTypes;

  statusOptions!:Status[];
  selectedStatus!:Status;

  constructor(private racmService:RacmBuilderService,
              private messageService:MessageService,
              private confirmatonService:ConfirmationService) {
                this.riskOptions=[{name:'Financial Risk'}, {name:'Brand Risk'}];
                this.controlOptions=[{name: 'Control 1'}, {name:'Control 2'}];
                this.controlTypesOptions=[{name:'Option 1'},{name:'Option 2'}];
                this.statusOptions=[{name:'Active'},{name:'Inactive'}];
              }

  ngOnInit(): void {
    this.racmService.get().subscribe((data) => {
      this.racmInterfaces=data;
    });

    this.cols=[
      { field: 'id', header: 'Unique Ref#' },
      { field: 'objective', header: 'Objective' },
      { field: 'risk', header: 'Risk'},
      { field: 'control', header:'Control'},
      { field: 'frequency', header:'Freq'},
      { field: 'controlType', header:'Type of Control'},
      { field: 'status', header:'Status'},
    ];
  }

  openNew(){
    this.racmInterface={};
    this.submitted=false;
    this.dialogBox=true;
  }
  saveData(){
    this.submitted = true;
//adding user selected option from dropdown to the obj.option brfore calling the API  
    this.racmInterface.risk=this.selectedRisk.name;
    this.racmInterface.control=this.selectedControl.name;
    this.racmInterface.controlType=this.selectedControlTypes.name;
    this.racmInterface.status=this.selectedStatus.name;

    if (this.racmInterface.objective?.trim()) {      
      if (this.racmInterface.id) {
        console.log(this.racmInterface.id);
        
        console.log("inside second if");
        this.racmInterfaces[this.findIndexById(this.racmInterface.id)] = this.racmInterface;

        this.racmService.put(this.racmInterface.id, this.racmInterface).subscribe((result) => {});

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Data Updated',
          life: 2500,
        });
      } else {
        this.racmInterface.id=this.createId();

    this.racmService.post(this.racmInterface).subscribe((result)=>{
      console.log("inside post save data");      
    });
    this.dialogBox = false;
    //this line displays the new entry added on the screen
    this.racmInterfaces.push(this.racmInterface);
    // this.racmInterfaces.push(this.racmInterface)
    //it is used to refresh the whole table data as the new entry is displayed in the table but 
    //not displayed on the current page report template
    this.ngOnInit();

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Data Added',
    });  }
  }}
  hideDialog(){
    this.dialogBox=false;
    this.submitted=false;
  }
  deleteRowData(rowData:any){
    this.confirmatonService.confirm({
      message: 'Are You sure you want to delete "' + rowData.id + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //calling delete mothod of service and passing id to delete that entry
        this.racmService.delete(rowData.id).subscribe(() => {
          });
          //this code removes the deleted row from the table on the screen only and not from db
        this.racmInterfaces = this.racmInterfaces.filter(
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
  editRowData(racmInterface:RacmInterface){
    //this will open dialog box with the existing data prefilled and call saveData()
    this.racmInterface={ ...racmInterface};
    this.dialogBox=true;
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.racmInterfaces.length; i++) {
      if (this.racmInterfaces[i].id === id) {
        index = i;
        break;
      }
    }
    console.log("inside find index by id"+index);
    
    return index;
  }
  createId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 4; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}

