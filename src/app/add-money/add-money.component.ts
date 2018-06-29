import { Component, OnInit } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {
  public addmoney="";
  public username="";
  constructor(public http:Http,public appservice:AppService) {
     this.appservice.proving()
   }

  ngOnInit() {
  }
  add(){
    let headers= new Headers()
    let creds = "adminname=" + sessionStorage.getItem("username") + "&" + "adminpassword=" + sessionStorage.getItem("userpassword") + "&username=" + this.username + "&addmoney="
    + this.addmoney ;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
     this.http.post(this.appservice.ip() + '/serve/add_money.php', creds, {headers: headers} ).map(res => res.json()).subscribe(
     data => {
        alert(data.msg);
     });
  }
 inquiry(){
     this.http.get(this.appservice.ip() + '/serve/inquiry_money.php?adminname=' + sessionStorage.getItem("username") + '&username=' + this.username ).map(res => res.json()).subscribe(
     data => {
        alert(data.msg);
     });
  }
  
}
