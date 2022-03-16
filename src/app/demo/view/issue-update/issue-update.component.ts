import { Component, OnInit, Input } from "@angular/core";
import { IssueUpdateService } from "../../service/issue-update.service";
import { RacmBuilderService } from "../../service/racm-builder.service";
import { Issue } from "./model/issues";

interface Impact {
    impact: string;
}

@Component({
    selector: "app-issue-update",
    templateUrl: "./issue-update.component.html",
    styleUrls: ["./issue-update.component.scss"],
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
    allIssueData: Issue[];

    issueCols!: any[];
    _selectedColumns: any[];

    constructor(
        private racmService: RacmBuilderService,
        private issue: IssueUpdateService
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
        this.dialogBox = true;
    }

    myUploader(event: any) {
        console.log(event);
    }

    onSumbit() {
        this.dialogBox = false;

        this.issueData = {};
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
            },
            (error) => {
                alert("something went wrong");
            }
        );
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

    editProduct(id: string) {
      alert(id)
    }

    deleteProduct(id: string) {
      alert(id)
    }
}
