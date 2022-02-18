import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
		<ul class="layout-menu">
			<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
		</ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            // {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'RAS-Audit Platform', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'RACM', icon: 'pi pi-fw pi-id-card', routerLink: ['/main/']},
                    {label: 'Data Request Section', icon: 'pi pi-fw pi-check-square', routerLink: ['/main/uikit/dataRequest'],
                    items: [
                        {label: 'Create Data Request', icon: 'pi pi-fw pi-check-square', routerLink: ['/main/uikit/dataRequest']},
                        {label: 'Data Upload', icon: 'pi pi-fw pi-check-square', routerLink: ['/main/uikit/dataUpload']},
                        
                    ]},
      
                ]
            },
        ];
    }
}
