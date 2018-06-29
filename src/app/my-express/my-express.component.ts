import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
import{ Router } from'@angular/router';
@Component({
  selector: 'app-my-express',
  templateUrl: './my-express.component.html',
  styleUrls: ['./my-express.component.css']
})
export class MyExpressComponent implements OnInit {
  public datas=[]
  public totalsum:number;
  public state = false;
  constructor(public http:Http,public appservice:AppService,public router:Router){ 
     this.appservice.proving()
  }

  ngOnInit() {
    this.http.get( this.appservice.ip() + '/serve/user_orderform.php?' + "username=" + sessionStorage.getItem("username")).map(res => res.json()).subscribe(
    data => {
    if(data.msg!=''){
          let arr=data.msg.split("&")
          let json = {};
      for(let i=0;i<arr.length;i++){
          let data=arr[i].split("*")
          console.log("长度：" + data.length)
          json["picture"]=data[0];
          json["title"]= data[1];
          json["unitprice"] = data[2] + "." + data[3];
          json["quantity"]  =  data[4];
          json["TransportationExpenses"] = data[9];
          json["totalsum"] = Number(data[2] + "." + data[3])*data[4] + Number(data[9])
          json["state"] = data[10];
          if(data[12]!="" && data[11]!=""){
            json["companyname"] = data[11];
            json["express"] = data[12];
            this.datas.push(json)
          }
			    json = {}
          }
        }else{
         this.state = true;
        }
    });
  }
 ViewExpress(e){
   let arr = this.datas[e]["picture"] + "*" + this.datas[e]["title"] + "*" + this.datas[e]["quantity"] + "*" + this.datas[e]["companyname"] + "*" + this.datas[e]["express"]
   + "*" + this.datas[e]["state"]
  sessionStorage.setItem("back","/my-express")
  this.router.navigate(["/view-logistics",arr])
 
  
 }

}
