import { Component, OnInit,ElementRef} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from './../app.service';
@Component({
  selector: 'app-add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.css']
})
export class AddCommodityComponent implements OnInit {

public class;
  public title;
  public picture;
  public price;
  public price2;
  public mode="包邮";
  public PurchasingVolume;
  public address;
  public title2;
  public act;
  public bigprice;
  public smallprice="00";
  public pictures;
  public bewrite;
  public brand;
  public model;
  public volume;
  public fn;
  public Applicable;
  public quality;
  public place;
  public other;
  public types;
  public imgs;
  public imgname;
  public classes=["live","Beauty","baby","hot","wines","shoes","tealeaves","watch","food","bags","ManDress","WomanDress"]
  constructor(public http:Http,public appservice:AppService,public el:ElementRef) { }

  ngOnInit() {

  }
  add(){
    let headers= new Headers()
    let creds = "admin=9527" + "&" + "class="+ this.class + "&" + "title=" +  this.title + "&" + "picture=" + this.picture + "&" + "price=" +  this.price + "&" + "price2=" +  this.price2 + "&" +  "mode=" + this.mode + "&" +  "PurchasingVolume=" + this.PurchasingVolume + "&" + "address=" +  this.address + "&"
    +  "title2=" + this.title2 + "&" + "act=" +  this.act + "&" + "bigprice=" + this.bigprice + "&" + "smallprice=" + this.smallprice + "&" + "pictures=" +  this.pictures + "&" +   "bewrite=" + this.bewrite + "&" +  "brand=" +  this.brand + "&" + "model=" +  this.model + "&" 
    +  "volume=" + this.volume + "&" +  "function=" + this.fn + "&" +  "Applicable=" +  this.Applicable + "&" + "quality=" +   this.quality + "&" + "place=" +  this.place + "&" + "other=" +  this.other + "#购物中遇到任何问题可联系客服,感谢你的光临！" + "&" + "css=" +  this.types;

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.appservice.ip() + '/serve/add_commodity.php', creds, {headers: headers} ).map(res => res.json()).subscribe(
    data => {
    alert(data.msg);window.location.reload();
    });

  }
 imgschange(){ 
    
    }

 leadinginpicture(){
    let obj=this.el.nativeElement.querySelector("#picture")
    this.picture = this.imgname + "/" + obj.files[0].name
       console.log(this.picture)   
    }  
leadinginpictures(){
    let obj=this.el.nativeElement.querySelector("#pictures")
    let temp="";
     for(let i=0;i<obj.files.length;i++){ 
       if(i==obj.files.length-1){
         temp =  temp + this.imgname + "/" + obj.files[i].name;  
       }else{
         temp =  temp + this.imgname + "/" + obj.files[i].name + "-";       
       }  
    } 
    this.pictures = temp;
    console.log(this.pictures);
}
console(){
    let obj=this.el.nativeElement.querySelector("#imgs")
    let temp="";
     for(let i=0;i<obj.files.length;i++){ 
       if(i==obj.files.length-1){
         temp =  temp + this.imgname + "/" + obj.files[i].name;  
       }else{
         temp =  temp + this.imgname + "/" + obj.files[i].name + "-";       
       }  
    } 
    this.other = temp;
    console.log(this.other);
    // console.log(this.imgs);
  //  console.log("admin=9527" +  "&" + "class="+ this.class + "&" + "title=" +  this.title + "&" + "picture=" + this.picture + "&" + "price=" +  this.price + "&" + "price2=" +  this.price2 + "&" +  "mode=" + this.mode + "&" +  "PurchasingVolume=" + this.PurchasingVolume + "&" + "address=" +  this.address + "&"
  //   +  "title2=" + this.title2 + "&" + "act=" +  this.act + "&" + "bigprice=" + this.bigprice + "&" + "smallprice=" + this.smallprice + "&" + "pictures=" +  this.pictures + "&" +   "bewrite=" + this.bewrite + "&" +  "brand=" +  this.brand + "&" + "model=" +  this.model + "&" 
  //   +  "volume=" + this.volume + "&" +  "function=" + this.fn + "&" +  "Applicable=" +  this.Applicable + "&" + "quality=" +   this.quality + "&" + "place=" +  this.place + "&" + "other=" +  this.other + "#购物中遇到任何问题可联系客服,感谢你的光临！" + "&" + "css=" +  this.types)
  }
}
