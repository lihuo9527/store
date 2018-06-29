import { Component, OnInit,ElementRef,OnDestroy} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from './../app.service';
@Component({
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls:['home.component.css','./../app.component.css']
})

export class HomeComponent implements OnInit,OnDestroy{
   public scrollTop :number;
   public picture =  [{url:this.appservice.pictureip() + "index/slide_1.png",link:['/classify','wines']},
                      {url:this.appservice.pictureip() + "index/slide_2.png",link:['/classify','tealeaves']},
                      {url:this.appservice.pictureip() + "index/slide_3.png",link:['/classify','Beauty']}]


   public items=[
		{title:this.appservice.pictureip() +  "index/1.png",container:[
		{text:"爱宝宝",text2:"给他最好的",picture:this.appservice.pictureip() + "index/2.png",Link:['/classify','baby']},
		{text:"爱美丽",text2:"护肤美妆补水",picture:this.appservice.pictureip() + "index/3.png",Link:['/classify','Beauty']},
		{text:"爱吃",text2:"吃货们的天堂",picture:this.appservice.pictureip() + "index/4.png",Link:['/classify','food']},
		{text:"生活超市",text2:"日常生活用品",picture:this.appservice.pictureip() + "index/10.png",Link:['/classify','live']}]},

		{title:this.appservice.pictureip() +  "index/6.png",container:[
		{text:"爱穿搭",text2:"潮流达人",picture:this.appservice.pictureip() + "index/7.png",Link:['/classify','shoes']},
		{text:"爱享受",text2:"中外名酒",picture:this.appservice.pictureip() + "index/8.png",Link:['/classify','wines']},
		{text:"精品手表",text2:"智能时尚运动",picture:this.appservice.pictureip() + "index/9.png",Link:['/classify','watch']},
		{text:"爱品茶",text2:"休闲养生",picture:this.appservice.pictureip() + "index/5.png",Link:['/classify','tealeaves']}]}
	 ]
   public commoditys = [];
   public timer:any;
constructor(private http:Http,public el:ElementRef,public router:Router,public appservice:AppService){
  this.http.get(this.appservice.ip() + '/serve/commodity_list2.php?'+ "index=home").map(res => res.json()).subscribe(data =>{
    let msg=data.msg.split("*")
	  let jsondata = {};
	for (let i=0;i<msg.length;i++){ 
		let arr =msg[i].split("：")
		if(arr[0]=="picture"){
         jsondata[arr[0]]=this.appservice.pictureip() + arr[1]
		}else{
        jsondata[arr[0]]=arr[1]
		}
		if(i==3||(i-3)/4%1==0){
			this.commoditys.push(jsondata)
			jsondata = {}
		}
	  }
   });
 }   
ngOnDestroy(){
    clearInterval(this.timer)

} 

	ngOnInit() {

  // 定义服务器地址
    // let wikiUrl = 'http://f.apiplus.net/cqssc.json';
    // this.jsonp.get(wikiUrl).map(res=> res.json()).subscribe((response) => {
    //             console.log(response);
    //         }, (error) => {
    //             console.error(error);
    //         });
	  // if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) && document.documentElement.clientWidth>768) {
		//   this.router.navigate(['/pc-page'])
		// }
                   
     this.timer = setInterval(()=>this.scrollTop=document.body.scrollTop,1000)
	  
	  
	}

}