import { Component, OnInit } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-order-form',
  templateUrl: './admin-order-form.component.html',
  styleUrls: ['./admin-order-form.component.css','./../app.component.css']
})
export class AdminOrderFormComponent implements OnInit {
public datas=[]
  public totalsum:number;
  public state=false;
  constructor(public http:Http,public appservice:AppService,public router:Router){ 
    this.appservice.proving()
  }

  ngOnInit() {
    this.change("全部")
  }
 ViewExpress(e){
  let arr = this.datas[e]["picture"] + "*" + this.datas[e]["title"] + "*" + this.datas[e]["quantity"] + "*" + this.datas[e]["companyname"] + "*" + this.datas[e]["express"]
  + "*" + this.datas[e]["state"]
  sessionStorage.setItem("back","/user-order-form")
  this.router.navigate(["/view-logistics",arr])
  console.log(arr)
 }
 update(i){
   let headers= new Headers()
   let creds = "&username=" + this.datas[i]["username"] + "&index=" + i + "&express=" + this.datas[i]["express"] +  "&companyname=" + this.datas[i]["companyname"]  +  "&state=" + this.datas[i]["state"]
   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //  console.log("username=" + this.datas[i]["username"] + "&index=" + i +  "&companyname=" + this.datas[i]["companyname"] + "&express=" + this.datas[i]["express"])
  this.http.post(this.appservice.ip() + '/serve/update_orderform.php',creds,{headers: headers}).map(res => res.json()).subscribe(
    data => {
        alert(data.msg)
    });
  
 }
 change(text){
  this.http.get( this.appservice.ip() + '/serve/admin_orderform.php?' + "username=" + sessionStorage.getItem("username")).map(res => res.json()).subscribe(
    data => {
    if(data.msg!=''){
          let arr=data.msg.split("^")
          this.datas=[];
          let json = {};
      for(let i=0;i<arr.length;i++){
          let items=arr[i].split("#")
          let item = items[1].split("&")
      for(let j=0;j<item.length;j++){
          let data=item[j].split("*")
          if(data[11]==text || text=="全部"){
          json["username"]=items[0];
          json["picture"]=data[0];
          json["title"]= data[1];
          json["unitprice"] = data[2] + "." + data[3];
          json["quantity"]  =  data[4];
          json["css"] = data[8];
          json["TransportationExpenses"] = data[10];
          json["totalsum"] = Number(data[2] + "." + data[3])*data[4] + Number(data[10])
          if(data[13]!="" && data[12]!=""){
            json["state"] = data[11];
             if(data[12]=='ems'){
                 json["companyname"]="EMS";
              }
              else if(data[12]=='zto'){
                 json["companyname"]="中通速递";
              }
              else if(data[12]=='BTWL'){
                 json["companyname"]="百世物流";
              }
              else if(data[12]=='DBL'){
                 json["companyname"]="德邦";
              }
              else if(data[12]=='HHTT'){
                 json["companyname"]="天天快递";
              }
              else if(data[12]=='HOAU'){
                 json["companyname"]="天地华宇";
              }    
              else if(data[12]=='HTKY'){
                 json["companyname"]="百世汇通";
              }  
              else if(data[12]=='SF'){
                 json["companyname"]="顺丰快递";
              }  
              else if(data[12]=='STO'){
                 json["companyname"]="申通快递";
              }  
              else if(data[12]=='YD'){
                 json["companyname"]="韵达快递";
              }  
              else if(data[12]=='YTO'){
                 json["companyname"]="圆通速递";
              }  
              else if(data[12]=='ZJS'){
                 json["companyname"]="宅急送";
              }
            else if(data[12]=='CITY100'){
                 json["companyname"]="城市100";
              }  
            else{
                 json["companyname"] = data[12];
              }  
            json["express"] = data[13];
          }else{
             json["state"] = "已付款";
          }
          this.datas.push(json)
			    json = {}
          }
        }
      }
    }
    console.log(text)
   });
 }
}
