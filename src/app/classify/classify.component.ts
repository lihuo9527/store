import { Component, OnInit,ElementRef } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router,ActivatedRoute} from'@angular/router';
import {AppService} from './../app.service';
@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css','./../app.component.css']
})
export class ClassifyComponent implements OnInit {
  public classes=[{"text":"热门推荐"},{"text":"生活用品"},{"text":"美妆护肤"},{"text":"母婴用品"},
  {"text":"手表"},{"text":"进口红酒"},{"text":"百搭鞋子"},{"text":"零食"},{"text":"精品茶叶"},{"text":"包包"},{"text":"男人衣柜"},{"text":"女人衣柜"}];
  public commoditys=[];
  public state=false;
  public backtext;
  public backdata;
  constructor(public el:ElementRef,public http:Http,public router:Router,public appservice:AppService,public activatedRoute:ActivatedRoute) {
     this.activatedRoute.params.subscribe(
      params => { this.backtext=params }
   );
    if(this.backtext.data!="" ){
    this.http.get(this.appservice.ip() + '/serve/commodity_list.php').map(res => res.json()).subscribe(data =>{
        this.backdata = data.msg
        this.get_commoditys(this.backtext.data)
       });
    }
    
   }

  ngOnInit() {
    this.el.nativeElement.querySelector(".classcontainer").style.height = document.documentElement.clientHeight - 45 + "px";
    this.el.nativeElement.querySelector("#classname").style.height = document.documentElement.clientHeight - 45 + "px"
  }
  
  classify(text){
    console.log("111:" + text + this.commoditys[0].class)
   if(text=="生活用品"){
     if(this.commoditys[0].class!="live")
     {
      this.get_commoditys("live")
     }
   }else if(text=="美妆护肤"){
     if(this.commoditys[0].class!="Beauty")
     {
      this.get_commoditys("Beauty")
     }
   }else if(text=="母婴用品"){
     if(this.commoditys[0].class!="baby")
     {
      this.get_commoditys("baby")
     }
  }else if(text=="热门推荐"){
     if(this.commoditys[0].class!="hot")
     {
      this.get_commoditys("hot")
     }
  }else if(text=="进口红酒"){
     if(this.commoditys[0].class!="wines")
     {
      this.get_commoditys("wines")
     }
  }else if(text=="百搭鞋子"){
     if(this.commoditys[0].class!="shoes")
     {
      this.get_commoditys("shoes")
     }
  }else if(text=="精品茶叶"){
     if(this.commoditys[0].class!="tealeaves")
     {
      this.get_commoditys("tealeaves")
     }
  }else if(text=="手表"){
     if(this.commoditys[0].class!="watch")
     {
      this.get_commoditys("watch")
     }
  }else if(text=="零食"){
     if(this.commoditys[0].class!="food")
     {
      this.get_commoditys("food")
     }
  }else if(text=="包包"){
     if(this.commoditys[0].class!="bags")
     {
      this.get_commoditys("bags")
     }
  }else if(text=="男人衣柜"){
     if(this.commoditys[0].class!="ManDress")
     {
      this.get_commoditys("ManDress")
     }
  }else if(text=="女人衣柜"){
     if(this.commoditys[0].class!="WomanDress")
     {
      this.get_commoditys("WomanDress")
     }
  }
}
 gocommodity(key){
 this.router.navigate(["/commodity",key])
 }

 get_commoditys(classtext:string){
      this.state=false;
      this.commoditys=[];
      let msg=this.backdata.split("*")
	    let jsondata = {};
	for(let i=0;i<msg.length;i++){ 
		  let arr =msg[i].split("：")

      if(arr[0]=="picture"){
        jsondata[arr[0]]=this.appservice.pictureip() + arr[1]
		   }else{
         jsondata[arr[0]]=arr[1]
       } 
    // console.log(jsondata["class"])
		  if(i==8||(i-8)/9%1==0){
      if(classtext=="hot"){
       if(this.commoditys.length>10){
          break;
         }else{
           this.commoditys.push(jsondata);
			     jsondata = {};
         }
       }else if(classtext==jsondata["class"]){
               this.commoditys.push(jsondata);
			         jsondata = {};
           }
		   }
	  }
    this.state=true;
    // console.log("data1:" + this.commoditys.toString)
 }
}
