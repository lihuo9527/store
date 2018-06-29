import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css','./../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserRegisterComponent implements OnInit {
  public user={
    name:"",
    password:"",
    password1:""
  }
  public alert_value : String = "";
  public alert_color : String = "red-color"
  public masking = false;
  constructor(public http:Http,public appservice:AppService) { 

  }

  ngOnInit() {
  }
UserRegister(){
  if(/^[\d]+$/.test(this.user.name)){
    if(this.user.name!='' && 
       this.user.name.length==11 &&
       this.user.password === this.user.password1 &&
       this.user.password != '' &&
       /^1[3|4|5|7|8][0-9]{9}$/.test(this.user.name) &&
       /^(\w){6,25}$/.test(this.user.password) ){
       this.masking = true;
       let headers= new Headers()
       let creds = "username=" + this.user.name + "&userpassword=" + this.user.password  + "&userpassword1=" + this.user.password1;
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       this.http.post(this.appservice.ip() + '/serve/user_register.php', creds, {headers: headers} ).map(res => res.json()).subscribe(
       data => {this.masking = false;this.alert_msg(data.msg)}
      );}
      else{if(this.user.name==''){
       this.alert_msg("用户名不能为空！")
      }
     else if(this.user.name.length!=11 || /^1[3|4|5|7|8][0-9]{9}$/.test(this.user.name)==false){
       this.alert_msg("用户名格式不合法！")
      }
     else if(this.user.password==''){
      this.alert_msg("密码不能为空！")
      }
      else if( this.user.password != this.user.password1){
       this.alert_msg("2次密码输入不一致，请重新输入！")
      } 
      else if(this.user.password.length<6 && this.user.password.length>25){
       this.alert_msg("密码格式不正确，请输入6-25位数字/字母！")
      } 
      else if(/^(\w){6,25}$/.test(this.user.password)==false){
       this.alert_msg("密码格式不正确，请输入6-25位数字/字母！")
      } 
        console.log("验证失败")
     }
  }else if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.user.name)){
    if(this.user.name!='' && 
       this.user.password != '' && 
       this.user.password === this.user.password1 &&
       /^(\w){6,25}$/.test(this.user.password) ){
       this.masking = true;
       let headers= new Headers()
       let creds = "username=" + this.user.name + "&userpassword=" + this.user.password + "&userpassword1=" + this.user.password1; ;
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       this.http.post(this.appservice.ip() + '/serve/user_register.php', creds, {headers: headers} ).map(res => res.json()).subscribe(
        data => {this.masking = false;this.alert_msg(data.msg)}
      );}   
      else{if(this.user.name==''){
       this.alert_msg("用户名不能为空！")
      }
     else if(this.user.password==''){
      this.alert_msg("密码不能为空！")
      }
      else if( this.user.password != this.user.password1){
       this.alert_msg("2次密码输入不一致，请重新输入！")
      } 
      else if(this.user.password.length<6 && this.user.password.length>25){
       this.alert_msg("密码格式不正确，请输入6-25位数字/字母！")
      } else if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.user.name)==false){
       this.alert_msg("用户名格式不合法！")
      } 
      else if(/^(\w){6,25}$/.test(this.user.password)==false){
       this.alert_msg("密码格式不正确，请输入6-25位数字/字母！")
      }
      }
  }else{
    this.alert_msg("用户名格式不合法！")
  }


}
alert_msg(text:String){
  if(text!="注册成功！"){
   this.alert_color="red-color";
   
  }else{
   this.user.name = "";
   this.user.password = "";
   this.user.password1 = "";
   this.alert_color="green-color";
  }
  this.alert_value = "";
  this.alert_value = text;
  setTimeout(() => this.alert_value = "", 3000);
 }
}
