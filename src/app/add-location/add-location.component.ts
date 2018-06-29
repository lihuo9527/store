import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router' ; 
import {AppService} from './../app.service';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class AddLocationComponent implements OnInit {
  public address ="";
  public parameter = '';
  public item={
    text:"",
    number:"",
    name:"",
  }
  public alert_value : String = "";
  public alert_color : String = "red-color"
  public data=[];
  public checked = false;
  public masking = false;
  constructor(public http:Http, public router:Router,public appservice:AppService){
    this.appservice.proving()
  }
    

  ngOnInit() {
    if(sessionStorage.getItem("address")!= null){
      this.data = sessionStorage.getItem("address").split("-")
      this.item.text =  this.data[3]
      this.item.name = sessionStorage.getItem("name")
      this.item.number = sessionStorage.getItem("number")
      this.parameter = 'true';
      
    }else{
      this.parameter = '';
    }
  }
  addressdata(e){
  this.address = e
  
   }
  delete(){
    this.masking = true;
    let headers= new Headers()
    let creds = "username=" + sessionStorage.getItem("username") + "&addressindex=" + sessionStorage.getItem("address_index") 
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.appservice.ip() + '/serve/delete_address.php', creds, {headers: headers} ).map(res => res.json()).subscribe(
    data => {this.masking = false;this.alert_msg(data.msg)});
  }
  add(){
    if(this.item.name != "" && this.item.text != "" && this.item.number !=""){
       if(/[&*-]/g.test(this.item.name)==true || /[&*-]/g.test(this.item.text)==true || /[&*-]/g.test(this.item.number)==true){
        this.alert_msg("信息填写不能有&*-符号,请重新输入！")
      }else{
       this.masking = true;
       let creds = '';
       let headers= new Headers()
       let text = this.item.name  + '-' +  this.item.number  +   '-' +  this.address + '-' + this.item.text + "*";
      if(this.parameter == 'true'){
        creds = "username=" + sessionStorage.getItem("username") + "&address=" + text + "&checked=" + this.checked + "&addressindex=" + sessionStorage.getItem("address_index");
      }else{
        creds = "username=" + sessionStorage.getItem("username") + "&address=" + text + "&checked=" + this.checked + "&addressindex=" + sessionStorage.getItem("address_index");;
      }
      // console.log("creds:" + creds)
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       this.http.post(this.appservice.ip() + '/serve/add_address.php', creds, {headers: headers} ).map(res => res.json()).subscribe(
       data => {this.masking = false;this.alert_msg(data.msg)});
      //  console.log(text + "&checked=" + this.checked + sessionStorage.getItem("address_index"))
      }
      
    }else{

       this.alert_msg("请补全个人收货信息,必填项不能为空!")
    }
   
  }

alert_msg(text:String){
  if(text=="保存成功！" || text=="删除成功！"){
   this.alert_color="green-color";
   this.router.navigate(["/my-address"])
  }else{
   this.alert_color="red-color";
  }
  this.alert_value = "";
  this.alert_value = text;
  setTimeout(() => this.alert_value = "", 3000);
 }

}
