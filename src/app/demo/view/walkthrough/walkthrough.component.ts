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

    walkthroughInterfaces!: WalkthroughInterface[];

    _selectedColumns: any[];

    constructor(
        private racmService: RacmBuilderService,
        private walkthroughService: WalkthroughServiceService
    ) {}

    ngOnInit(): void {
        this.racmService.get().subscribe((data) => {
            this.walkthroughInterfaces = data;
            console.log(this.walkthroughInterfaces);
        });

        this.racmCols = [
            // { field: "id", header: "Unique Ref#" },
            { field: "objective", header: "Objective" },
            { field: "risk", header: "Risk" },
            { field: "Process", header: "Process" },
            { field: "subProcess", header: "Sub Process" },
            { field: "walkthrough", header: "Walkthrough" },
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
