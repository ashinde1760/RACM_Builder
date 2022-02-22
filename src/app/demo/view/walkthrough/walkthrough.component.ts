import { Component, Input, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { RacmBuilderService } from "../../service/racm-builder.service";
import { WalkthroughServiceService } from "../../service/walkthrough.service";
import { ProcessmasterInterface } from "../process-master/processmaster-interface";
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

    constructor(
        private racmService: RacmBuilderService,
        private walkthroughService: WalkthroughServiceService
    ) {}

    ngOnInit(): void {
        this.racmService.get().subscribe((data) => {
            this.racmData = data;
        //    console.log(this.racmData);
        });

        this.walkthroughService.get().subscribe((data) => {
            this.racmData = this.racmData.concat(data);
            console.log(this.racmData);
        });


        // this.racmData=[...this.racmData,...this.processMasterData];
        // console.log(this.racmData);
        


        this.racmCols = [
            // { field: "id", header: "Unique Ref#" },
            { field: "objective", header: "Objective" },
            { field: "risk", header: "Risk" },
           
        ];

        this._selectedColumns = this.racmCols;
    }
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
