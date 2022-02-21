import { Component, OnInit } from '@angular/core';
import { WalkthroughServiceService } from '../../service/walkthrough.service';
import { ProcessmasterInterface } from './processmaster-interface';

@Component({
  selector: 'app-process-master',
  templateUrl: './process-master.component.html',
  styleUrls: ['./process-master.component.scss']
})
export class ProcessMasterComponent implements OnInit {

  processMasterInterfaces!: ProcessmasterInterface[];
  processMasterInterface!: ProcessmasterInterface;

  constructor(
    private walkthroughService: WalkthroughServiceService
  ) { }

  ngOnInit(): void {
    this.walkthroughService.get().subscribe((data) => {
      this.processMasterInterfaces = data;
    });

  }

}
