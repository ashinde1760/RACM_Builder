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
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'RAS-Audit Platform', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'RACM', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/racmBuilder']},
                    {label: 'Data Request', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/dataRequest']},
                    
                ]
            },
        ];
    }
}
