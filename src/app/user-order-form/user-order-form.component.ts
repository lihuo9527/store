import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-order-form',
  templateUrl: './user-order-form.component.html',
  styleUrls: ['./user-order-form.component.css','./../app.component.css']
})
export class UserOrderFormComponent implements OnInit {
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
 change(text){
  this.http.get( this.appservice.ip() + '/serve/user_orderform.php?' + "username=" + sessionStorage.getItem("username")).map(res => res.json()).subscribe(
    data => {
      if(data.msg!=''){
          let arr=data.msg.split("&")
          this.datas=[];
          let json = {};
      for(let i=0;i<arr.length;i++){
          let data=arr[i].split("*")
        if(data[11]==text || text=="全部"){
          json["picture"]=data[0];
          json["title"]= data[1];
          json["unitprice"] = data[2] + "." + data[3];
          json["quantity"]  =  data[4];
          json["css"] = data[8];
          json["TransportationExpenses"] = data[10];
          json["totalsum"] = Number(data[2] + "." + data[3])*data[4] + Number(data[10])
          if(data[13]!="" && data[12]!=""){
            json["state"] = data[11];
            json["companyname"] = data[12];
            json["express"] = data[13];
          }else{
             json["state"] = "已付款";
          }
          this.datas.push(json)
			    json = {}
          }
        }
      }else{
           this.state = true;
        }
      if(this.datas.length==0){
         this.state = true;
      }else{
        this.state = false;
      }
    });
    
    console.log(text)
 }
}
