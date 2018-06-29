import { Directive, Input, HostListener, Output, EventEmitter,ElementRef} from '@angular/core';
 
  @Directive({ selector: '[SlideImgDirective]' })
  export class SlideImgDirective {
     @Output() public SlideImgDirective = new EventEmitter<any>();
        
     private touchStartX;
     private touchStartY;
    
   constructor(private el:ElementRef) {

}
    @HostListener('touchstart', ['$event'])  onTouchStart(e) {
        console.log("开始：" + e.changedTouches[0].clientX)
         this.touchStartX = e.changedTouches[0].clientX;
         this.touchStartY = e.changedTouches[0].clientY;
         this.el.nativeElement.style.zIndex = "3";
    }
      @HostListener('touchmove', ['$event'])  onTouchmove(e) {
         let moveX = e.changedTouches[0].clientX - this.touchStartX;
         let moveY = e.changedTouches[0].clientY - this.touchStartY;
       if (Math.abs(moveY) < Math.abs(moveX)) {
            //  Y轴移动小于X轴 判定为横向滑动
             if (moveX > 0) {
                 console.log('direction'+'left'+'index'+this.el.nativeElement.title+"state"+"ing")
                this.el.nativeElement.style.left = moveX*1.5 + "px";
                this.SlideImgDirective.emit({'direction':'left','index':Number(this.el.nativeElement.title),"state":"ing"});
                }else if (moveX < 0) {
                this.el.nativeElement.style.left = moveX*1.5+ "px";
                this.SlideImgDirective.emit({'direction':'right','index':Number(this.el.nativeElement.title),"state":"ing"});
               }
               } else if (Math.abs(moveY) > Math.abs(moveX)) {
         
            //  Y轴移动大于X轴 判定为纵向滑动
             if (moveY > 0) {
               this.el.nativeElement.style.left = moveX*1.5 + "px";
               this.SlideImgDirective.emit({'direction':'left','index':Number(this.el.nativeElement.title),"state":"ing"});
           } else if (moveY < 0) {
              this.el.nativeElement.style.left = moveX*1.5 + "px";
              this.SlideImgDirective.emit({'direction':'right','index':Number(this.el.nativeElement.title),"state":"ing"});
            }
        }
    }
     @HostListener('touchend', ['$event']) onTouchEnd(e) {
        let moveX = e.changedTouches[0].clientX - this.touchStartX;
        let moveY = e.changedTouches[0].clientY - this.touchStartY;
        console.log("结束：" + moveX)
         if (Math.abs(moveY) < Math.abs(moveX)) {
            // Y轴移动小于X轴 判定为横向滑动
             if (moveX >= 80) {
                console.log("跳转下一个！")
                 this.el.nativeElement.style.left = "100%";
                  setTimeout(()=>this.SlideImgDirective.emit({'direction':'left','index':Number(this.el.nativeElement.title),"state":"end"}),500) 
                
          } else if(moveX < 80 && moveX >= 0 || moveX > -80 && moveX < 0){
              console.log("保持原状！")
              this.el.nativeElement.style.left = "0";
              this.SlideImgDirective.emit({'direction':'auto','index':Number(this.el.nativeElement.title),"state":"next"});
          }else if(moveX < -80 && moveX < 0){
             this.el.nativeElement.style.left = "-100%";
             setTimeout(()=>this.SlideImgDirective.emit({'direction':'right','index':Number(this.el.nativeElement.title),"state":"end"}),500) 
             
       }

     }                
         else if (Math.abs(moveY) > Math.abs(moveX)) {
            // Y轴移动大于X轴 判定为纵向滑动
            if (moveY >= 50) {
                console.log("跳转下一个！")
                this.SlideImgDirective.emit({'direction':'left','index':Number(this.el.nativeElement.title),"state":"end"});
                this.el.nativeElement.style.left = "100%";
          } else if(moveY < 50 && moveY >= 0 || moveY > -50 && moveY < 0){
              console.log("保持原状！")
              this.el.nativeElement.style.left = "0";
              this.SlideImgDirective.emit({'direction':'auto','index':Number(this.el.nativeElement.title),"state":"next"});
          }else if(moveY < -50 && moveY < 0){
             this.el.nativeElement.style.left = "-100%";
             this.SlideImgDirective.emit({'direction':'right','index':Number(this.el.nativeElement.title),"state":"end"});
           }
        }
     }
}