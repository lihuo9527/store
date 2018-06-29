import { Component, OnInit,ElementRef,Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
 @Input() public text;
  constructor(public el:ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.querySelector(".alert").style.height = document.documentElement.clientHeight + "px"
    this.el.nativeElement.querySelector(".alert2").style.height = document.documentElement.clientHeight + "px"
    
  }
  back(){
    window.history.back()
  }

}
