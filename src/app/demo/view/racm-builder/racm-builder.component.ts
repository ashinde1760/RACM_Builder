import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import Swal from "sweetalert2";

import { RacmBuilderService } from "../../service/racm-builder.service";
import { Racm } from "./model/racm-interface";

interface BuisnessProcess {
    process: string;
}

interface SubProcess {
    subProcess: string;
}

interface Risk {
    risk: string;
}
interface Control {
    control: string;
}
interface ControlTypes {
    controlType: string;
}
interface Status {
    status: string;
}

@Component({
    selector: "app-racm-builder",
    templateUrl: "./racm-builder.component.html",
    styleUrls: ["./racm-builder.component.scss"],
    providers: [MessageService, ConfirmationService],
})
export class RacmBuilderComponent {
    cols!: any[];
    racmInterfaces!: Racm[];
    racmInterface!: Racm;
    dialogBox!: boolean;
    submitted!: boolean;

    riskOptions!: Risk[];
    selectedRisk!: string;;

    controlOptions!: Control[];
    selectedControl!: string;

    controlTypesOptions!: ControlTypes[];
    selectedControlTypes!: string;

    statusOptions!: Status[];
    selectedStatus!: string;

    buisnessProcesses: BuisnessProcess[];
    selectedBuisnessProcess: string;

    subProcesses: SubProcess[];
    selectedSubProcess: string;;

    constructor(
        private racmService: RacmBuilderService,
        private messageService: MessageService,
        private confirmatonService: ConfirmationService
    ) {
        this.riskOptions = [
            { risk: "Financial" },
            { risk: "Brand" },
            { risk: "Operational" },
            { risk: "Compliance" },
        ];

        this.controlOptions = [
            { control: "Control 1" },
            { control: "Control 2" },
            { control: "Control 3" },
            { control: "Control 4" },
        ];

        this.controlTypesOptions = [
            { controlType: "Type 1" },
            { controlType: "Type 2" },
            { controlType: "Type 3" },
            { controlType: "Type 4" },
        ];

        this.statusOptions = [{ status: "Active" }, { status: "Inactive" }];

        this.buisnessProcesses = [
            { process: "process 1" },
            { process: "process 2" },
            { process: "process 3" },
            { process: "process 4" },
        ];

        this.subProcesses = [
            { subProcess: "Sub-Process 1" },
            { subProcess: "Sub-Process 2" },
            { subProcess: "Sub-Process 3" },
            { subProcess: "Sub-Process 4" },
        ];
    }

    ngOnInit(): void {
        this.racmService.get().subscribe((data) => {
            this.racmInterfaces = data;
            console.log(this.racmInterface);
        });

        this.cols = [
            { field: "id", header: "Unique Ref#" },
            {field:'buisnessProcess',header:'Buisness Process'},
            {field:'subProcess',header:'Sub Process'},
            { field: "objective", header: "Objective" },
            { field: "risk", header: "Risk" },
            { field: "control", header: "Control" },
            { field: "frequency", header: "Freq" },
            { field: "controlType", header: "Type of Control" },
            { field: "status", header: "Status" },
        ];
    }

    openNew() {
        this.racmInterface = {};
        this.submitted = false;
        this.dialogBox = true;
    }
    saveData() {
      this.submitted = true;
      if (this.racmInterface.objective.trim()) {
          if (this.racmInterface.id) {
            this.racmInterfaces[this.findIndexById(this.racmInterface.id)] = this.racmInterface;

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
                      // this.racmInterface.buisnessProcess = this.selectedBuisnessProcess["process"];
                     
                      // if(this.selectedBuisnessProcess["process"]===undefined)
                      // {
                      //     this.racmInterface.buisnessProcess =this.selectedBuisnessProcess
                      // }
                      // else
                      // {
                      //     this.racmInterface.buisnessProcess =this.selectedBuisnessProcess['process']
                      // }

                      if(this.selectedSubProcess["subProcess"]===undefined)
                      {
                          this.racmInterface.subProcess =this.selectedSubProcess
                      }
                      else
                      {
                          this.racmInterface.subProcess =this.selectedSubProcess['subProcess']
                      }

                      if(this.selectedRisk["risk"]===undefined)
                      {
                          this.racmInterface.risk =this.selectedRisk
                      }
                      else
                      {
                          this.racmInterface.risk =this.selectedRisk['risk']
                      }

                      if(this.selectedControl["control"]===undefined)
                      {
                          this.racmInterface.control =this.selectedControl
                      }
                      else
                      {
                          this.racmInterface.control =this.selectedControl['control']
                      }

                      if(this.selectedControlTypes["controlType"]===undefined)
                      {
                          this.racmInterface.controlType =this.selectedControlTypes
                      }
                      else
                      {
                          this.racmInterface.controlType =this.selectedControlTypes['controlType']
                      }

                      if(this.selectedControlTypes["status"]===undefined)
                      {
                          this.racmInterface.status =this.selectedStatus
                      }
                      else
                      {
                          this.racmInterface.status =this.selectedStatus['status']
                      }


  
                      Swal.fire("Saved!", "", "success");
                      //Logic for Update
                      this.racmService.put(this.racmInterface.id, this.racmInterface)
                          .subscribe(
                              (data: any) => {
                                  this.ngOnInit();
                              },
                              (error) => {
                                  alert(
                                      "Something went wrong while updating existing Racm Builder data...!!"
                                  );
                              }
                          );
                  } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                  }
              });
          } else {
            this.racmInterface.id=this.createId();
              //code for Saving New Client
              this.racmInterface.buisnessProcess = this.selectedBuisnessProcess['process'];
              this.racmInterface.subProcess = this.selectedSubProcess['subProcess'];
              this.racmInterface.risk = this.selectedRisk['risk'];
              this.racmInterface.control = this.selectedControl['control'];
              this.racmInterface.controlType = this.selectedControlTypes['controlType'];
              this.racmInterface.status = this.selectedStatus['status'];


              this.racmService.post(this.racmInterface).subscribe(
                  (data: any) => {
                      this.ngOnInit();
                      this.messageService.add({
                          severity: "success",
                          summary: "Success",
                          detail: "Client Created Successfully",
                      });
                  },
                  (error) => {
                      alert(
                          "something went wrong while creating new Escalation racmInterface...!!"
                      );
                  }
              );
              this.dialogBox = false;
          }
      }
    }


    hideDialog() {
        this.dialogBox = false;
        this.submitted = false;
    }


    deleteRowData(rowData: any) {
        this.confirmatonService.confirm({
            message: 'Are You sure you want to delete "' + rowData.id + '"?',
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                //calling delete mothod of service and passing id to delete that entry
                this.racmService.delete(rowData.id).subscribe(() => {});
                //this code removes the deleted row from the table on the screen only and not from db
                this.racmInterfaces = this.racmInterfaces.filter(
                    (val) => val.id !== rowData.id
                );
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Data Deleted",
                });
            },
        });
    }


    editRowData(racmInterface1: Racm) {
        //this will open dialog box with the existing data prefilled and call saveData()
        this.racmInterface = { ...racmInterface1 };

        this.selectedBuisnessProcess=racmInterface1.buisnessProcess || racmInterface1.buisnessProcess['process'];
        this.selectedSubProcess=racmInterface1.subProcess || racmInterface1.subProcess['subProcess'];
        this.selectedRisk=racmInterface1.risk || racmInterface1.risk['risk'];
        this.selectedControl=racmInterface1.control || racmInterface1.control['control'];
        this.selectedControlTypes=racmInterface1.controlType || racmInterface1.controlType['controlType'];
        this.selectedStatus=racmInterface1.status || racmInterface1.status['status']

        this.dialogBox = true;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.racmInterfaces.length; i++) {
            if (this.racmInterfaces[i].id === id) {
                index = i;
                break;
            }
        }
        console.log("inside find index by id" + index);

        return index;
    }


    createId(): string {
        let id = "";
        var chars = "0123456789";
        for (var i = 0; i < 4; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
