import { Component, OnInit,ElementRef } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({

  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(public http:Http,public appservice:AppService,public el:ElementRef) { }

  ngOnInit() {

  }
  
}
