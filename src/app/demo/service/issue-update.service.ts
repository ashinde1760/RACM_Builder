import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Issue } from "../view/issue-update/model/issues";

@Injectable({
    providedIn: "root",
})
export class IssueUpdateService {
    constructor(private http: HttpClient) {}

    addIssue(data: any) {
        console.log("in post method in service", data);
        return this.http.post<any>("http://localhost:3000/issueData", data);
    }

    getIssueDetails(process: string, projectId: string) {
        return this.http.get<any>(
            `${
                environment.url + "/issueData"
            }?process=${process}&projectId=${projectId}`
        );
    }

    editIssueData(id: string, data: Issue) {
        return this.http.put(`${environment.url + "/issueData/"}${id}`, data);
    }

    deleteIssue(id: string) {
        return this.http.delete<any>("http://localhost:3000/issueData/" + id);
    }
}
