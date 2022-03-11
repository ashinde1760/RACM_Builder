import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import Swal from "sweetalert2";

import { RacmBuilderService } from "../../service/racm-builder.service";
import { Racm, Racm1 } from "./model/racm-interface";

interface BuisnessProcess {
    process: string;
}

// interface SubProcess {
//     subProcess: string;
// }

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
    racmInterfaces!: any[];
    racmInterface!: Racm1;
    dialogBox!: boolean;
    submitted!: boolean;

    processName: string;
    projectId: string;

    riskOptions!: Risk[];
    selectedRisk!: string;

    controlOptions!: Control[];
    selectedControl!: string;

    controlTypesOptions!: ControlTypes[];
    selectedControlTypes!: string;

    statusOptions!: Status[];
    selectedStatus!: string;

    buisnessProcesses: BuisnessProcess[];
    selectedBuisnessProcess: string;

    subProcesses: any[];

    // ///////////////////////////////

    racmData1: any[] = [];
    selectedSubProcess: any;
    subProcessData: Racm;
    fields: boolean = false;

    constructor(
        private racmService: RacmBuilderService,
        private messageService: MessageService,
        private confirmatonService: ConfirmationService
    ) {
        this.controlTypesOptions = [
            { controlType: "Automated" },
            { controlType: "Manual" },
            { controlType: "Operating" },
            { controlType: "Financial" },
            { controlType: "Compliance" },
        ];

        this.statusOptions = [{ status: "Active" }, { status: "Inactive" }];
    }

    ngOnInit(): void {
        this.processName = localStorage.getItem("processName");
        this.projectId = localStorage.getItem("projectId"); 



        console.log(this.processName);

        this.racmService.get(this.processName,this.projectId).subscribe(
            (data) => {
                this.racmInterfaces = data;
                console.log(this.racmInterfaces, "all racm data");
            },
            (error) => {
                alert("something went wrong");
            }
        );

        this.racmService
            .getProcessDataByName(this.processName, this.projectId)
            .subscribe((data: any) => {
                this.racmData1 = data;
                console.log(this.racmData1);
            });

        this.cols = [
            { field: "refId", header: "Unique Ref#" },
            { field: "process", header: "Buisness Process" },
            { field: "subProcess", header: "Sub Process" },
            { field: "objective", header: "Objective" },
            { field: "risk", header: "Risk" },
            { field: "control", header: "Control" },
            { field: "frequency", header: "Freq" },
            { field: "typeOfControl", header: "Type of Control" },
            { field: "status", header: "Status" },
        ];
    }

    onClick() {
        this.fields = true;
        for (let i = 0; i < this.racmData1.length; i++) {
            if (
                this.racmData1[i].subProcess ===
                this.selectedSubProcess.subProcess
            ) {
                this.subProcessData = this.racmData1[i];
            }
        }
    }

    openNew() {
        this.racmInterface = {};
        this.submitted = false;
        this.dialogBox = true;
    }
    saveData() {
        this.submitted = true;
        if (this.racmInterface.objective.trim()) {
            if (this.racmInterface.refId) {
                this.racmInterfaces[
                    this.findIndexById(this.racmInterface.refId)
                ] = this.racmInterface;

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
                        this.racmInterface.process = this.processName;

                        Swal.fire("Saved!", "", "success");
                        //Logic for Update
                        this.racmService
                            .put(this.racmInterface.refId, this.racmInterface)
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
                this.racmInterface.refId = this.createId();
                this.racmInterface.process = this.processName;
                this.racmInterface.subProcess =
                    this.selectedSubProcess["subProcess"];
                this.racmInterface.risk = this.subProcessData.risk;
                this.racmInterface.control = this.subProcessData.control;
                this.racmInterface.typeOfControl =
                    this.selectedControlTypes["controlType"];
                this.racmInterface.status = this.subProcessData.status;
                this.racmInterface.projectId=this.projectId;
                //code for Saving New Client

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

        // this.selectedBuisnessProcess =
        //     racmInterface1.buisnessProcess ||
        //     racmInterface1.buisnessProcess["process"];
        // this.selectedSubProcess =
        //     racmInterface1.subProcess ||
        //     racmInterface1.subProcess["subProcess"];
        // this.selectedRisk = racmInterface1.risk || racmInterface1.risk["risk"];
        // this.selectedControl =
        //     racmInterface1.control || racmInterface1.control["control"];
        // this.selectedControlTypes =
        //     racmInterface1.controlType ||
        //     racmInterface1.controlType["controlType"];
        // this.selectedStatus =
        //     racmInterface1.status || racmInterface1.status["status"];

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
