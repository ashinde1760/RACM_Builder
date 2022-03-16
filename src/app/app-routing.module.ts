import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import { DashboardComponent } from './demo/view/dashboard/dashboard.component';
import { RacmBuilderComponent } from './demo/view/racm-builder/racm-builder.component';
import { DataRequestComponent } from './demo/view/data-request/data-request.component';
import { LoginComponent } from './login/login.component';
import { WalkthroughComponent } from './demo/view/walkthrough/walkthrough.component';
import { DatauploadComponent } from './demo/view/dataupload/dataupload.component';
import { ReportGenerationComponent } from './demo/view/report-generation/report-generation.component';
import { DataWorkspaceComponent } from './demo/view/data-workspace/data-workspace.component';
import { IssueUpdateComponent } from './demo/view/issue-update/issue-update.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path:'',
                component:LoginComponent
            },
            {
                path:'home', component:DashboardComponent
            },
            {
                path: 'main', component: AppMainComponent,
                children: [
                    {path:'',component:RacmBuilderComponent},
                    {path:'uikit/dataRequest',component:DataRequestComponent},
                    {path:'uikit/dataWorkspace',component:DataWorkspaceComponent},
                    {path:'uikit/dataUpload',component:DatauploadComponent},
                    {path:'uikit/walkthrough',component:WalkthroughComponent},
                    {path:'uikit/issueUpdate',component:IssueUpdateComponent},
                    {path:'uikit/report',component:ReportGenerationComponent},
                    {path: 'utilities/display', component: DisplayComponent},
                    {path: 'utilities/elevation', component: ElevationComponent},
                    {path: 'utilities/flexbox', component: FlexboxComponent},
                    {path: 'utilities/grid', component: GridComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'utilities/widgets', component: WidgetsComponent},
                    {path: 'utilities/spacing', component: SpacingComponent},
                    {path: 'utilities/typography', component: TypographyComponent},
                    {path: 'utilities/text', component: TextComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent}
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
