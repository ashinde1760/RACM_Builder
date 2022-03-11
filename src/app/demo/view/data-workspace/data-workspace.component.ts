import { Component, OnInit } from "@angular/core";
import { RacmBuilderService } from "../../service/racm-builder.service";
import { DataWorkspace } from "../racm-builder/model/data-workspace";

@Component({
    selector: "app-data-workspace",
    templateUrl: "./data-workspace.component.html",
    styleUrls: ["./data-workspace.component.scss"],
})
export class DataWorkspaceComponent implements OnInit {
    cols!: any[];
    processName: string;
    projectId: string;

    sProcess: [] = [];

    processes: DataWorkspace[];
    selectedProcess!: DataWorkspace;

    constructor(private racmBuilderService: RacmBuilderService) {
        // this.processes = [{ name: 'Order to Cash' }, { name: 'Procure to pay' }, { name: 'Human Resource'}];
    }

    ngOnInit(): void {
        this.processName = localStorage.getItem("processName");
        this.projectId = localStorage.getItem("projectId");
        this.racmBuilderService
            .getProcessDataByName(this.processName, this.projectId)
            .subscribe((data: any) => {
                this.processes = data;
            });
    }
    method() {
        this.cols = [
            { field: "projectId", header: "Project ID" },
            { field: "refId", header: "Ref ID" },
            { field: "process", header: "Process" },
            { field: "subProcess", header: "subProcess" },
            { field: "risk", header: "Risk" },
            { field: "control", header: "Control" },
            { field: "walkthrough", header: "Walkthrough" },
            { field: "location", header: "Location" },
            { field: "status", header: "Status" },
        ];
    }
}
