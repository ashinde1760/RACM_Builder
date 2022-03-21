import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class OrgChartService {
    constructor(private http: HttpClient) {}

    getProjectDataByProjectId(projectId: string) {
        return this.http.get<any>(
            `${environment.url + "/projects"}?Id=${projectId}`
        );
    }
    getRacmDataByProjectId(projectId: string) {
        return this.http.get<any>(
            `${environment.url + "/racmControlData"}?projectId=${projectId}`
        );
    }
}
