import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
   public parameter:any;
   public obj:any;
   public picture;
   public commodity_number=1;
   public masking = false;
   public alert_text:string;
   constructor(public router:Router,public activatedRoute:ActivatedRoute,public http:Http,public appservice:AppService) { 
    if(sessionStorage.getItem("commodity-data") == null || sessionStorage.getItem("commodity-data") =="" ||
       sessionStorage.getItem("username") == "" || sessionStorage.getItem("username") == null){
      alert("请重新提交订单！")
      this.router.navigate(["/home"])
    }else{
      this.obj = JSON.parse(sessionStorage.getItem("commodity-data"))
      this.picture = this.obj.pictures[0].url
    }


  }
   
  
  ngOnInit() {
    this.http.get(this.appservice.ip() + '/serve/user_address.php?' + "username=" + sessionStorage.getItem("username")).map(res => res.json()).subscribe(
   data => {
     if(data.msg!=''){
       let msg=data.msg.split("*")
      for (let i=0;i<msg.length-1;i++){ 
        let arr =msg[i].split("-")
        this.obj["name"]=arr[0];
        this.obj["number"]=arr[1];
        this.obj["address"]= arr[2] + arr[3] + arr[4] + arr[5];
        break;
      }
     }else{
       this.router.navigate(["/my-address"])
     }
    });
  }
  back(){
   this.router.navigate(["/commodity",this.obj.key])
  }
  add(){
    this.commodity_number++;
  }
  sub(){
    if(this.commodity_number>1){
      this.commodity_number--;
    }
  }
  pay(){
     this.masking = true;
     let totalsum = Number(this.obj.bigprice + "." + this.obj.smallprice)*this.commodity_number
     let headers  = new Headers()
     let creds = "username=" + sessionStorage.getItem("username") + "&userpassword=" + sessionStorage.getItem("userpassword")
       + "&orderform=" + this.picture + "*" + this.obj.title + "*" + this.obj.bigprice  + "*" + this.obj.smallprice + "*" + this.commodity_number 
       + "*" + this.obj.name + "*" + this.obj.number + "*" + this.obj.address + "*" + this.obj.model_ + "*" + totalsum + "*" 
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       console.log(creds)
       this.http.post(this.appservice.ip() + '/serve/add_orderform.php', creds, {headers: headers} ).map(res => res.json()).subscribe(
       data => 
       { console.log(data.msg);
         this.masking = false;
         this.alert_text = data.msg;
       }
      );
    }

}
