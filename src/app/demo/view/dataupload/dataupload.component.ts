import { Component, OnInit } from '@angular/core';
import { DatareqServiceService } from '../../service/datareq-service.service';
import {DataUp} from './DataUp'

@Component({
  selector: 'app-dataupload',
  templateUrl: './dataupload.component.html',
  styleUrls: ['./dataupload.component.scss']
})
export class DatauploadComponent implements OnInit {

  dataUploads: any[]=[];
  dataUpload!: DataUp;

  submitted: boolean;
  dataUploadDialog: boolean;

  constructor(private dataReqService: DatareqServiceService) { }

  ngOnInit(): void {
    this.dataReqService.getDataReq().subscribe(
      (data: any) => {
          this.dataUploads = data;
          console.log("from init",this.dataUploads); 
      },
      (error) => {
          alert("something went wrong");
      }
  );
  
  }

  editRowData(dataUpload:DataUp){
    //this will open dialog box with the existing data prefilled and call saveData()
    this.dataUpload={ ...dataUpload};
    // this.selectedtargetDate = dataUpload.targetDate;
    this.dataUploadDialog=true;
  }

  hideDialog() {
    this.dataUploadDialog = false;
    this.submitted = false;
  }
  save(){
    this.submitted = true;
    console.log("data upload contents",this.dataUpload);
    this.dataUploadDialog = false;
    
  }



}
