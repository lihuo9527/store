import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ; 
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {
  public address = ""
  public state = false;
  addressdata(e){
  this.address = e
  // console.log(this.address)
}

 public address_list=[
  //  {state:"true",name:"小明",number:"15976541331",address:"广东省-茂名市-化州市-阿百川等等",ok:"true"},
  //  {state:"flase",name:"小红",number:"15976541332",address:"广东省-茂名市-化州市-版本搜索",ok:""},
  //  {state:"flase",name:"小王",number:"15976541333",address:"广东省-茂名市-化州市-对对对发发",ok:""}
 ]
change(i){
  sessionStorage.setItem("state",this.address_list[i].state)
  sessionStorage.setItem("name",this.address_list[i].name)
  sessionStorage.setItem("number",this.address_list[i].number)
  sessionStorage.setItem("address",this.address_list[i].address)
  sessionStorage.setItem("ok",this.address_list[i].ok)
  sessionStorage.setItem("address_index",i)
  this.router.navigate(["/add-location"])
}
 add(){
   sessionStorage.removeItem("state")
   sessionStorage.removeItem("name")
   sessionStorage.removeItem("number")
   sessionStorage.removeItem("address")
   sessionStorage.removeItem("ok")
   sessionStorage.removeItem("address_index")
   this.router.navigate(["/add-location"])
 }
  constructor(private router:Router,public http:Http,public appservice:AppService) {
      this.appservice.proving()
   }

  ngOnInit() {
   this.http.get(this.appservice.ip() + '/serve/user_address.php?' + "username=" + sessionStorage.getItem("username")).map(res => res.json()).subscribe(
   data => {
     if(data.msg!=''){
       let msg=data.msg.split("*")
       let jsondata = {};
       let state = "";
       let ok ="";
      for (let i=0;i<msg.length-1;i++){ 
        if(i==0){
           state="true";
           ok = "true";
        }else{
           state="flase";
           ok = "";
        }
        let arr =msg[i].split("-")
        jsondata["name"]=arr[0];
        jsondata["number"]=arr[1];
        jsondata["address"]= arr[2] +'-'+ arr[3] +'-'+ arr[4] +'-'+ arr[5];
        jsondata["state"] = state;
        jsondata["ok"] = ok;
        this.address_list.push(jsondata);
        jsondata = {};
        }
     }else{
       this.state = true;
      } 
    })  
  }

}
