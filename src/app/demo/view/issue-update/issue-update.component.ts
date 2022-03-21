import { Component, OnInit, Input } from "@angular/core";
import { IssueUpdateService } from "../../service/issue-update.service";
import { RacmBuilderService } from "../../service/racm-builder.service";
import { Issue } from "./model/issues";
import Swal from "sweetalert2";
import { ConfirmationService, MessageService } from "primeng/api";

interface Impact {
    impact: string;
}

@Component({
    selector: "app-issue-update",
    templateUrl: "./issue-update.component.html",
    styleUrls: ["./issue-update.component.scss"],
    providers: [MessageService, ConfirmationService],
})
export class IssueUpdateComponent implements OnInit {
    processName!: string;
    projectId: string;
    racmData: any[];
    dialogBox: boolean = false;
    impact: Impact[];

    singleRiskData: any[];
    refID: string;
    selectedImpact: string;
    selectedSubProcess: string;
    selectedRisk: string;
    observation: string;
    rootCause: string;

    issueData!: Issue;
    issueDatas: Issue[] = [];
    allIssueData: Issue[];

    issueCols!: any[];
    _selectedColumns: any[];

    submitted: boolean;

    constructor(
        private racmService: RacmBuilderService,
        private issue: IssueUpdateService,
        private messageService: MessageService,
        private confirmatonService: ConfirmationService
    ) {
        this.impact = [
            { impact: "Financial" },
            { impact: "Operational" },
            { impact: "Compliance" },
            { impact: "Brand" },
        ];
    }

    ngOnInit(): void {
        this.processName = localStorage.getItem("processName");
        this.projectId = localStorage.getItem("projectId");

        this.racmService
            .getProcessDataByName(this.processName, this.projectId)
            .subscribe((data: any) => {
                console.log(data);
                this.racmData = data;
            });

        this.issue.getIssueDetails(this.processName, this.projectId).subscribe(
            (data) => {
                this.allIssueData = data;
                console.log(this.allIssueData, "all issues");
            },
            (error) => {
                alert("something went wrong...!!");
            }
        );

        this.issueCols = [
            { field: "id", header: "ID" },
            { field: "process", header: "Process" },
            { field: "subProcess", header: "Sub Process" },
            { field: "walkthrough", header: "Walkthrough" },
            { field: "risk", header: "Risk" },
            { field: "control", header: "Control" },
            { field: "refId", header: "Ref ID" },
            { field: "observation", header: "Observation" },
            { field: "rootCause", header: "Root Cause" },
            { field: "impact", header: "Impact" },
        ];

        this._selectedColumns = this.issueCols;
    }

    //to show filtered columns
    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }
    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.issueCols.filter((col) =>
            val.includes(col)
        );
    }

    openDialog() {
        this.issueData = {};
        this.dialogBox = true;
    }

    myUploader(event: any) {
        console.log(event);
    }

    onSumbit() {
        this.submitted = true;
        console.log(this.issueData, "aaaaaaaa");

        if (this.issueData.id) {
          this.dialogBox=false;
          alert(this.issueData.id+" is present")
             this.allIssueData[this.findIndexById(this.issueData.id)]=this.issueData;
              console.log(this.issueData,'tasdiq');
              
            this.issue
                .editIssueData(this.issueData.id, this.issueData)
                .subscribe(
                    (data) => {
                        console.log(data,"shivvvv");
                        this.ngOnInit();
                    },
                    (error) => {
                        alert(error + " something went wrong");
                    }
                );
        } else {
            this.issueData.issueId = this.createId();
            this.issueData.process = this.processName;
            this.issueData.projectId = this.projectId;
            this.issueData.subProcess = this.selectedSubProcess["subProcess"];
            this.issueData.risk = this.selectedRisk["risk"];
            this.issueData.refId = this.refID;
            this.issueData.observation = this.observation;
            this.issueData.rootCause = this.rootCause;
            this.issueData.impact = this.selectedImpact["impact"];
            this.issueData.walkthrough = this.singleRiskData["walkthrough"];
            this.issueData.control = this.singleRiskData["control"];

            this.issue.addIssue(this.issueData).subscribe(
                (data) => {
                    console.log(data, "issue data");
                    this.ngOnInit();
                    this.dialogBox = false;
                },
                (error) => {
                    alert("something went wrong");
                }
            );
        }
    }

    hideDialog() {
        this.dialogBox = false;
        this.submitted = false;
    }

    riskData() {
        this.racmService
            .getRiskByName(
                this.processName,
                this.projectId,
                this.selectedRisk["risk"]
            )
            .subscribe(
                (data) => {
                    this.singleRiskData = data[0];
                    this.refID = data[0].refId;
                },
                (error) => {
                    alert("something went wrong...!!");
                }
            );
    }

    editProduct(issueData1: Issue) {
        this.issueData = { ...issueData1 };
        console.log(issueData1, "anemoi");

        this.dialogBox = true;
    }

    deleteProduct(id: string) {
      console.log("aaa");
      this.issue.deleteIssue(id).subscribe(
        (data) => {
          alert("deleted sucess")
          this.ngOnInit();
        },
        (error)=>{
          alert("error")
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.allIssueData.length; i++) {
            if (this.allIssueData[i].id === id) {
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
