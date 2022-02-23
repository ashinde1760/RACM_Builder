import { Component, OnInit } from "@angular/core";
import readXlsxFile from "read-excel-file";
import { Subscription } from "rxjs";
import { ReportGenerationService } from "../../service/report-generation.service";
import { ReportGeneration } from "./model/report-generation";

@Component({
    selector: "app-report-generation",
    templateUrl: "./report-generation.component.html",
    styleUrls: ["./report-generation.component.scss"],
})
export class ReportGenerationComponent implements OnInit {
    data: any;

    chartOptions: any;

    subscription: Subscription;

    config: any;

    report: boolean = false;
    reportGenerationInterface!: ReportGeneration;

    constructor(private reportGenerationService: ReportGenerationService) {}

    ngOnInit(): void {
        this.data = {
            labels: ["A", "B", "C"],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
            ],
        };
    }
    excelRead(e: any) {
        console.log("clicked on upload");
        let fileReaded: any;
        fileReaded = e.target.files[0];
        let type = e.target.files[0].name.split(".").pop();

        const schema = {
            reportNum: {
                prop: "reportNum",
                type: String,
                required: false,
            },
            clientName: {
                prop: "clientName",
                type: String,
                required: false,
            },
            risk: {
                prop: "risk",
                type: String,
                required: false,
            },
            control: {
                prop: "control",
                type: String,
                required: false,
            },
            background: {
                prop: "background",
                type: String,
                required: false,
            },
            obHeader: {
                prop: "obHeader",
                type: String,
                required: false,
            },
            detailedOb: {
                prop: "detailedOb",
                type: String,
                required: false,
            },
            impact: {
                prop: "impact",
                type: String,
                required: false,
            },
            rootCause: {
                prop: "rootCause",
                type: String,
                required: false,
            },
            impactType: {
                prop: "impactType",
                type: String,
                required: false,
            },
            chartRef: {
                prop: "chartRef",
                type: String,
                required: false,
            },
        };
        readXlsxFile(e.target.files[0], { schema }).then((data: any) => {
            this.report = true;

            console.log(data, "before caloling service");
            console.log(
                this.reportGenerationInterface,
                "This is data Interface before"
            );

            if (data.rows) {
                for (let i of data.rows) {
                    this.reportGenerationInterface = i;
                    console.log(
                        this.reportGenerationInterface,
                        "This is data Interface AKKI"
                    );

                    // this.reportGenerationInterface.reportNum = this.createId();

                    // this.reportGenerationService
                    //   .postData(this.reportGenerationInterface)
                    //   .subscribe((result) => {
                    // console.log('post calling and subscribing', result);
                    // this.dataInterfaces.push(this.dataInterface);
                    // });
                    // this.dataInterfaces.push(this.dataInterface);
                }
            }
        });
    }

    getLightTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
        };
    }

    getDarkTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
        };
    }
}
