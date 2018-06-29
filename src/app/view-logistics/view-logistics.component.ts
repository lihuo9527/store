import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-view-logistics',
  templateUrl: './view-logistics.component.html',
  styleUrls: ['./view-logistics.component.css']
})
export class ViewLogisticsComponent implements OnInit {
  public datas={};
  public back;
  public items = {};
  public item;
  public data_state = false;
  constructor(public http:Http,public router:Router,public activatedRoute:ActivatedRoute,public appservice:AppService) { 
  this.back = sessionStorage.getItem("back")
    this.activatedRoute.params.subscribe(
      params => {this.item = params;}
   );
    let arr = this.item.data.split("*")
    this.datas["picture"] = arr[0];
    this.datas["title"] = arr[1];
    this.datas["quantity"] = arr[2];
    this.datas["express"] = arr[4];
    this.datas["state"] = arr[5];
  if(arr[3]=='ems'){
    this.datas["companyname"]="EMS";
  }
  else if(arr[3]=='zto'){
    this.datas["companyname"]="中通速递";
  }
  else if(arr[3]=='BTWL'){
    this.datas["companyname"]="百世物流";
  }
   else if(arr[3]=='DBL'){
    this.datas["companyname"]="德邦";
  }
  else if(arr[3]=='HHTT'){
    this.datas["companyname"]="天天快递";
  }
   else if(arr[3]=='HOAU'){
    this.datas["companyname"]="天地华宇";
  }    
   else if(arr[3]=='HTKY'){
    this.datas["companyname"]="百世汇通";
  }  
   else if(arr[3]=='SF'){
    this.datas["companyname"]="顺丰快递";
  }  
   else if(arr[3]=='STO'){
    this.datas["companyname"]="申通快递";
  }  
  else if(arr[3]=='YD'){
    this.datas["companyname"]="韵达快递";
  }  
  else if(arr[3]=='YTO'){
    this.datas["companyname"]="圆通速递";
  }  
  else if(arr[3]=='ZJS'){
    this.datas["companyname"]="宅急送";
  }
 else if(arr[3]=='CITY100'){
    this.datas["companyname"]="城市100";
  }  
 else{
    this.datas["companyname"] = arr[3];
  }  
   
   this.http.get(this.appservice.ip() + '/serve/logistics-inquiry.php?' + "name=" + arr[3] + "&number=" + arr[4]).map(res => res.json()).subscribe(
   data => {
     if(data.Traces.length>0){
      
     }else{
        this.data_state=true;
     }
       
        this.items["Traces"] = data.Traces;
   });

  }

  ngOnInit() {
    
  }

}
