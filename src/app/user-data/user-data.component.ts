import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css','./../app.component.css']
})
export class UserDataComponent implements OnInit {
   public username = "";
   public userpassword = "";
   public money = "0";
   public userface= this.appservice.pictureip() + "user/userface.png"
   public fns = [
     {router:"/user-order-form",text:"全部订单",text2:"查看全部订单",icon:"glyphicon glyphicon-list-alt"},
     {router:"/shopping-car",text:"购物车",text2:"",icon:"glyphicon glyphicon-shopping-cart"},
     {router:"/my-express",text:"我的快递",text2:"",icon:"glyphicon glyphicon-gift"},
     {router:"/my-address",text:"我的收货地址",text2:"",icon:"glyphicon glyphicon-flag"}
   ]
  constructor(private router: Router,public http:Http,public appservice:AppService) {
    this.appservice.proving()
   }

  ngOnInit() {
       this.username  = sessionStorage.getItem("username")
       this.userpassword  = sessionStorage.getItem("userpassword")
       this.http.get(this.appservice.ip() + '/serve/user_money.php?'+ "username="+this.username + "&userpassword="+this.userpassword).map(res => res.json()).subscribe(data =>{
       this.money = data.msg });
  }
 back(){
  sessionStorage.clear();
  this.router.navigate(['/login']);
 }

}
