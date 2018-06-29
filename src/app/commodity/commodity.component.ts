import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.css','./../app.component.css']
})
export class CommodityComponent implements OnInit,AfterViewInit {
  public commodity = {
    pictures:[],
    css:[],
    model_:""
      // title:"", 
      // act:"", 
      // bigprice:"", 	
      // smallprice: "",
      // bewrite:"",
      // brand:"",
      // model:"",
      // volume:"",
      // function:"",
      // Applicable:"",
      // quality:"",
      // place:"",
      // other:""
   };
  public pictures=[];
  public key:any;
  public backtext="";
  public masking = false;
  public other;
constructor(public http:Http,public router:Router,public activatedRoute:ActivatedRoute,public appservice:AppService){
   this.activatedRoute.params.subscribe(
      params => {this.key = params}
   );
  
  //  console.log("key：" + this.key.data);
  this.http.get(this.appservice.ip() +'/serve/commodity_list3.php?'+ "key=" + this.key.data ).map(res => res.json()).subscribe(data =>{
       let msg=data.msg.split("*")
	 for(let i=0;i<msg.length;i++){ 
		   let arr = msg[i].split("：")
   if(arr[0]=="css"){
      // console.log("css:" + arr[1])
     if(arr[1]!="" && arr[1]!="undefined"){
        let arr2 = arr[1].split("#")
    for(let j=0;j<arr2.length;j++){
        this.commodity.css.push(arr2[j])
       }
      this.commodity.model_ = this.commodity.css[0]
     }
   }else if(arr[0]=="pictures"){
      let arr2 = arr[1].split("-")
     for(let j=0;j<arr2.length;j++){
        this.commodity.pictures.push({"url":this.appservice.pictureip() + arr2[j]})
       }
    }else{
         this.commodity[arr[0]]=arr[1];
       }
	   }
    //  console.log("other:" + this.commodity["other"])
     let items = this.commodity["other"].split("#")
     let item = items[0].split("-")
     this.other = items[1]
    //  console.log("item:" +  item.length)
     if(item.length>0){
      for(let i=0;i<item.length;i++){
        this.pictures.push(this.appservice.pictureip()+item[i])
      }
      // console.log("pictures:" +  this.pictures)
     }
    //  let items = this.commodity["other"].split("*")
    //  let item = items[0].split("-")
    //  if(item>0){
    //   for(let i=0;i<item.length;i++){
    //     this.pictures.push(item[i])
    //   }
    //  }
     
     
    //  console.log("length：" + this.commodity.pictures.length);
   });
  
}
ngAfterViewInit(){
  document.body.scrollTop = 0;
  }
ngOnInit() {
  // console.log("scrolltop:" + document.body.scrollTop)
   
}
model_event(){
   console.log("model：" + this.commodity.model_)
   console.log("length:" + this.commodity.css.length)
}
back(){
  window.history.back()
}
buy(){
 this.appservice.proving()
 this.commodity["key"] = this.key.data;
 sessionStorage.setItem("commodity-data",JSON.stringify(this.commodity))
 this.router.navigate(["/pay"])
  }
add(){
  this.appservice.proving()
  this.backtext ="正在提交申请,请稍后...";
  this.masking  = true;
  let headers= new Headers()
  let creds = "username=" + sessionStorage.getItem("username") + "&datas="+ this.key.data + "*" + this.commodity["pictures"][0]["url"] + "*"  + this.commodity["title"] + "*" +  this.commodity["bigprice"] + "*"  + this.commodity["smallprice"] + "*" + "1" + "*" + this.commodity.model_ + "*";
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  this.http.post(this.appservice.ip() + '/serve/add_shoppingcar.php?', creds, {headers: headers} ).map(res => res.json()).subscribe(data =>{
  if(data.msg=="添加成功！"){
    this.backtext="已成功添加到购物车！"
    setTimeout(()=> this.masking  = false,2000)
   }else{
    this.backtext="添加失败,请检查网络环境！"
    setTimeout(()=> this.masking  = false,2000)
   }
  });

   // console.log("username=" + sessionStorage.getItem("username") + "&datas=key="+ this.key.data + "*" + "picture=" + this.commodity["pictures"][0]["url"] + "*" + "title=" + this.commodity["title"] + "*"
  // + "bigprice=" + this.commodity["bigprice"] + "*" + "smallprice=" + this.commodity["smallprice"] + "*" + "quantity=1" + "*"
  // )
 }
}
