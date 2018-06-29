import { Component, OnInit ,ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {
  public datas=[]
  public money=0;
  public quantity=0;
  public backtext="";
  public masking = false;
  public state = false;
  public obj = {
    name:"",
    number:"",
    address:""
  };
  public index_array =[];
  public alert_text="";
  constructor(public http:Http,public router:Router,public activatedRoute:ActivatedRoute,public appservice:AppService,public el:ElementRef) { 
  this.appservice.proving();
  this.http.get(this.appservice.ip() + '/serve/user_address.php?' + "username=" + sessionStorage.getItem("username")).map(res => res.json()).subscribe(
   data => {
     console.log(data.msg)
     if(data.msg!=''){
       let msg=data.msg.split("*")
      for (let i=0;i<msg.length-1;i++){ 
        let arr =msg[i].split("-")
        this.obj.name=arr[0];
        this.obj.number=arr[1];
        this.obj.address= arr[2] + arr[3] + arr[4] + arr[5];
        break;
      }
     }else{
       this.router.navigate(["/my-address"])
     }
  });
 }

ngOnInit() {
 this.http.get( this.appservice.ip() + '/serve/user_shoppingcar.php?' + "username=" + sessionStorage.getItem("username")).map(res => res.json()).subscribe(
    data => {
      console.log(data.msg)
      if(data.msg!=''){
        let arr = data.msg.split("&")
        let json = {};
    for(let i=0;i<arr.length-1;i++){
        let data = arr[i].split("*")
        json["key"]=data[0];
        json["picture"]= data[1];
        json["title"] = data[2]
        json["bigprice"] = data[3];
        json["smallprice"] = data[4];
        json["unitprice"]  = data[3] + "." + data[4];
        json["quantity"] = data[5];
        json["checked"] = false;
        this.datas.push(json);
			  json = {};
      }
    }else{
     this.state =true;
   }
  });
}

  blur(i){
  console.log(this.datas[i]["checked"]=!this.datas[i]["checked"])
    if(this.datas[i]["checked"]){
       this.quantity++;
      // console.log(Number(this.datas[i]["unitprice"]))
       this.money = this.money + Number(this.datas[i]["unitprice"])
    }else{
      this.quantity--;
      this.money =  this.money - Number(this.datas[i]["unitprice"])
    }
  }

  pay(){
  if(this.money==0){
      return;
    }
  this.backtext ="正在连接支付中,请稍后！";
  this.masking  = true;
  let headers= new Headers()
  let creds = "username=" + sessionStorage.getItem("username") + "&userpassword=" + sessionStorage.getItem("userpassword") + "&money=" + this.money +  "&orderform=" 
  for(let i=0;i<this.datas.length;i++){
    if(this.datas[i]["checked"]===true){
    this.index_array.push(i)
    creds = creds  + this.datas[i]["picture"] + "*" +  this.datas[i]["title"] + "*" + this.datas[i]["bigprice"]  + "*" + this.datas[i]["smallprice"] + "*" + this.datas[i]["quantity"]  + "*" + this.obj.name + "*" + this.obj.number + "*" + this.obj.address + "*" +  this.datas[i]["bigprice"] + "." + this.datas[i]["smallprice"] + "*"  + "#"
    }
  }
  creds = creds + "&index=" + this.index_array.join("*")
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  this.http.post(this.appservice.ip() + '/serve/add_orderform.php?', creds, {headers: headers} ).map(res => res.json()).subscribe(data =>{
    console.log("array:" + this.index_array[0] + this.index_array[1] )
    console.log(data.msg);
    console.log(data.data);
    this.masking = false;
    this.alert_text = data.msg;
  });

  }
  delete(i){
  this.backtext ="正在提交申请,请稍后...";
  this.masking  = true;
  let headers= new Headers()
  let creds = "username=" + sessionStorage.getItem("username") + "&index="+ i ;
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  this.http.post(this.appservice.ip() + '/serve/delete_shoppingcar.php?', creds, {headers: headers} ).map(res => res.json()).subscribe(data =>{
   if(data.msg=="删除成功！"){
   let new_array = [] //重组datas;
  for(let j=0;j<this.datas.length;j++){ 
    if(j != i){ 
      new_array.push(this.datas[j])
     } 
    } 
    this.datas = new_array
    this.backtext="已删除订单！"
    console.log(this.datas.toString())
    setTimeout(()=> this.masking  = false,2000)
    if(this.datas.length==0){
      this.state = true;
    }
   }else{
    this.backtext="删除失败,请检查网络环境！"
    setTimeout(()=> this.masking  = false,2000)
   }
  });
  }
}
