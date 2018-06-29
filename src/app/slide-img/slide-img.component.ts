import { Component, OnInit, Input,ViewChild,ElementRef,AfterViewInit,OnDestroy,Output,DoCheck,AfterViewChecked,ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-slide-img',
  templateUrl: './slide-img.component.html',
  styleUrls: ['./slide-img.component.css']
})
export class SlideImgComponent implements OnInit,AfterViewInit,DoCheck,OnDestroy,AfterViewChecked{
      @Input() public imgs=[];
      @Input() public slide:string;
      @Input() public setheight:string;
      public children_length:number;
      public img_index:number;
      public img_length:number;
      public timer;
      public timer2;
      public parameter = false;
      public parameter2 = false;
  constructor(private el:ElementRef,private crd:ChangeDetectorRef) {
    
   
  }
 //当视图/组件变更改执行
ngAfterViewChecked(){
if(this.parameter2 == false){
   this.children_length = this.el.nativeElement.querySelector(".imgs").children.length-1;
   if(this.children_length>0){ 
      this.parameter2 = true;
      this.img_index = this.children_length-1;
      this.Change({'direction':'right','index':this.img_index,"state":"end"});//初始化slide 
      this.crd.detectChanges();
    }
  }  
}

//当变更检测周期中调用
ngDoCheck(){
 if(this.imgs.length>0 && this.parameter == false){
   this.parameter = true;
   this.img_length = this.imgs.length;
  
 }
}
//初始化组件
ngOnInit() {
  if(this.setheight=="true"){
   this.el.nativeElement.querySelector(".imgs").style.height=document.documentElement.clientHeight/3.3 + "px"
  }else{
   this.el.nativeElement.querySelector(".imgs").style.height=document.documentElement.clientHeight/2 + "px"
  }
}

//销毁组件
ngOnDestroy(){
   if(this.slide == "start"){
      clearInterval(this.timer)
      clearInterval(this.timer2)
    }
  }
  //视图和组件初始化完毕再执行
ngAfterViewInit(){
   this.children_length = this.el.nativeElement.querySelector(".imgs").children.length-1;
   if(this.children_length<=0){
     return;
   }
  this.parameter2 = true;
  this.parameter = true;
  this.img_length = this.imgs.length;
  this.img_index = this.children_length - 1 ;
  this.Change({'direction':'right','index':this.img_index,"state":"end"})//初始化slide 
   if(this.slide == "start"){
      this.timer_()
     }
  }
touch_start(){
   if(this.slide == "start"){
      clearInterval(this.timer)
      clearInterval(this.timer2)
    }
  }
touch_end(){
   if(this.slide == "start"){
     this.timer_()
    }
}
timer_(){
    this.timer = setInterval(()=>this.slied(),6000)
}
slied(){
  clearInterval(this.timer2)
  let i =7;
  // console.log("this.children_length:"+ this.children_length)
  // console.log("this.img_index:"+ this.img_index)
  if(this.children_length == this.img_index){
        this.el.nativeElement.querySelector(".imgs").children[this.img_index-1].children[0].style.zIndex="3";
        this.el.nativeElement.querySelector(".imgs").children[0].children[0].style.zIndex="2";
         }else {
        this.el.nativeElement.querySelector(".imgs").children[this.img_index-1].children[0].style.zIndex="3";
        this.el.nativeElement.querySelector(".imgs").children[this.img_index].children[0].style.zIndex="2";
        }
 this.timer2= setInterval(()=>{
  if(i<100 && i!=7){
   this.el.nativeElement.querySelector(".imgs").children[this.img_index-1].children[0].style.left = i +"%"; 
  }
  if(i == 238){
   this.Change({'direction':'right','index':3,'state':'end','buff':'slide'})
  }
  i=i+7;
//  console.log("i:"+ i)
  },40)
}
Change(e) {
    if(e.buff=="slide"){
      this.el.nativeElement.querySelector(".imgs").children[this.img_index-1].children[0].style.left="100%"; 
      e.index = this.img_index-1;
      }
    if(e.state=="end"){
       if(parseInt(e.index)+2>this.children_length){
             this.img_index = 1
       }else{
         this.img_index = (parseInt(e.index)+2);
       }
       if(e.direction=="left"){
         if(parseInt(e.index)==0){
            this.img_index = this.children_length;
         }else{
           this.img_index = e.index;
         }
         
         if(e.index==0){
           this.el.nativeElement.querySelector(".imgs").children[this.children_length-1].children[0].style.zIndex="2";
           this.for_img(this.children_length-1,"true")
         }else{
          this.el.nativeElement.querySelector(".imgs").children[e.index-1].children[0].style.zIndex="2";
          this.for_img(e.index-1,"true")
         }
        
       }else{
         if(this.children_length == parseInt(e.index)+1){
            this.el.nativeElement.querySelector(".imgs").children[0].children[0].style.zIndex="2";
             this.for_img(0,"true")
         }else{
            this.el.nativeElement.querySelector(".imgs").children[(parseInt(e.index)+1)].children[0].style.zIndex="2";
             this.for_img((parseInt(e.index)+1),"true")
         }
         
       }
    }else if(e.state=="ing"){
      if(e.direction == "left"){
         if(e.index==0){
           this.el.nativeElement.querySelector(".imgs").children[this.children_length-1].children[0].style.zIndex="2";
         }else{
           this.el.nativeElement.querySelector(".imgs").children[e.index-1].children[0].style.zIndex="2";
         }
       }else{
         
        if(this.children_length == parseInt(e.index)+1){
            this.el.nativeElement.querySelector(".imgs").children[0].children[0].style.zIndex="2";
         }else {
            this.el.nativeElement.querySelector(".imgs").children[(parseInt(e.index)+1)].children[0].style.zIndex="2";
        }
      }
    }else if(e.state=="next"){
       this.for_img(e.index,"false")
    }
  }
  for_img(index:any,left:any){
     for(let i=0;i<this.children_length;i++){
            if(i!= index){
                this.el.nativeElement.querySelector(".imgs").children[i].children[0].style.zIndex="0";
                if(left!="false"){
                  setTimeout(()=> this.el.nativeElement.querySelector(".imgs").children[i].children[0].style.left="0",500)
                 
                }
                
            }
     }
  }




}