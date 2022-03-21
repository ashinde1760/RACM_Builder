import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, TreeNode } from "primeng/api";
import { OrganizationChartModule } from "primeng/organizationchart";
import { DashboardService } from "../../service/dashboard.service";
import { OrgChartService } from "../../service/org-chart.service";
import { RacmBuilderService } from "../../service/racm-builder.service";
import { DataWorkspace } from "../racm-builder/model/data-workspace";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    animations: [
        trigger("rowExpansionTrigger", [
            state(
                "void",
                style({
                    transform: "translateX(-10%)",
                    opacity: 0,
                })
            ),
            state(
                "active",
                style({
                    transform: "translateX(0)",
                    opacity: 1,
                })
            ),
            transition(
                "* <=> *",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
        ]),
    ],
})
export class DashboardComponent implements OnInit {
    clientName: string;
    // processes: DataWorkspace[];`

    projectId: string;
    orgChartData!: TreeNode[];
    racmData!: DataWorkspace[];
    selectedNode!: TreeNode;

    projectData: any = [];
    processData: any = [];

    constructor(
        private router: Router,
        private service: DashboardService,
        private racmService: RacmBuilderService,
        private messageService: MessageService,
        private orgChartService: OrgChartService
    ) {}

    ngOnInit(): void {
        this.service.getProjects().subscribe(
            (data) => {
                this.projectData = data;
            },
            (error) => {
                alert("something went wrong on dashboard");
            }
        );
        this.orgChartData=[];

    }

    next() {
        this.router.navigate(["/main"]);
    }

    onClick(data: number) {
        // this.router.navigate(['/main']);
        this.projectId=data.toString();

        this.racmService.getProcessData(data).subscribe(
            (data) => {
                this.processData = data;
            },
            (error) => {
                alert("something went wrong..");
            }
        );
        
        //to get Client Name
        this.orgChartService
            .getProjectDataByProjectId(this.projectId)
            .subscribe((data: any) => {                
                this.clientName = data[0].clientName;                
            });
        //to get RACM data by project ID from "racmControlData" array
        this.orgChartService.getRacmDataByProjectId(this.projectId).subscribe((data: any) => {
                this.racmData = data;
                this.orgChart();
      });

    }
    orgChart() {
        let childrenNodes = [];
        let subNodes = [];

        let node = {};
        let nodeGroup = [];

        this.racmData.map((element) => {
            // console.log("racmData Map Element is ", element);
            if (nodeGroup.includes(element.process)) {
                //add subnode for subprocess
                subNodes.push({
                    label: "Sub Process",
                    type: "person",
                    styleClass: "p-person",
                    expanded: true,
                    data: {
                        name: element.subProcess,
                    },
                });
            } else {
                //clear subnode array
                subNodes = [];

                //add node of subprocess
                subNodes.push({
                    label: "Sub Process",
                    type: "person",
                    styleClass: "p-person",
                    expanded: true,
                    data: {
                        name: element.subProcess,
                    },
                });

                //add new node for process
                node = {
                    label: "Process",
                    type: "person",
                    styleClass: "p-person",
                    expanded: true,
                    data: {
                        name: element.process,
                    },
                    children: subNodes,
                };

                childrenNodes.push(node);
                nodeGroup.push(element.process);
            }
        });

        // console.log("GET Final Data", childrenNodes);

        this.orgChartData = [
            {
                label: "Compay Name",
                type: "person",
                styleClass: "p-person",
                expanded: true,
                data: { name: this.clientName },

                children: childrenNodes,
            },
        ];

        // console.log("Children Nodes", childrenNodes);
        // console.log("Sub Nodes", subNodes);
        // console.log("Node", node);
        // console.log("Node Groups", nodeGroup);
    }

    onNodeSelect(event: { node: { label: any } }) {
        this.messageService.add({
            severity: "info",
            summary: event.node.label,
            detail: event.node['data'].name,
        });
    }

    onSortChange(data: any) {}

    processAudit(data: any) {
        // console.log(data);
        localStorage.setItem("processName", data.process);
        localStorage.setItem("projectId", data.projectId);
        this.router.navigate(["/main"]);
    }
}
