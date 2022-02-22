import { Component, Input, OnInit } from "@angular/core";
import { RacmBuilderService } from "../../service/racm-builder.service";
import { WalkthroughServiceService } from "../../service/walkthrough.service";
import { Racm } from "../racm-builder/model/racm-interface";
import { WalkthroughInterface } from "./walkthrough-interface";

@Component({
    selector: "app-walkthrough",
    templateUrl: "./walkthrough.component.html",
    styleUrls: ["./walkthrough.component.scss"],
})
export class WalkthroughComponent implements OnInit {
    racmCols!: any[];
    pmCols!: any[];

    racmInterfaces!: Racm[];
    racmInterface!: Racm;
    allData: any[];

    idd: string;

    racmData: any[];
    processMasterData: any[];

    _selectedColumns: any[];

    processName: string;
    projectId: string;

    racmData1: any[] = [];

    constructor(
        private racmService: RacmBuilderService,
        private walkthroughService: WalkthroughServiceService
    ) {}

    ngOnInit(): void {
        // this.racmService.get().subscribe((data) => {
        //     this.racmData = data;
        // //    console.log(this.racmData);
        // });

        // this.walkthroughService.get().subscribe((data) => {
        //     this.racmData = this.racmData.concat(data);
        //     console.log(this.racmData);
        // });

        this.processName = localStorage.getItem("processName");
        this.projectId = localStorage.getItem("projectId");

        console.log(this.processName);

        this.racmService
            .getProcessDataByName(this.processName, this.projectId)
            .subscribe((data: any) => {
                console.log(data);
                this.racmData = data;
                console.log(this.racmData1, "getting this in walkthrough??");
            });

        // this.racmData=[...this.racmData,...this.processMasterData];
        // console.log(this.racmData);

        this.racmCols = [
            // { field: "id", header: "Unique Ref#" },
            { field: "objective", header: "Objective" },
            { field: "risk", header: "Risk" },
            { field: "process", header: "Process" },
            { field: "subProcess", header: "Sub Process" },
        ];

        this._selectedColumns = this.racmCols;
    }
    //to show filtered columns
    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }
    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.racmCols.filter((col) =>
            val.includes(col)
        );
    }
}
