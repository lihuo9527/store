import { Component, OnInit ,ElementRef,Input} from '@angular/core';

@Component({
  selector: 'app-masking-out',
  templateUrl: './masking-out.component.html',
  styleUrls: ['./masking-out.component.css']
})
export class MaskingOutComponent implements OnInit {
  @Input() public text:string;
  constructor(public el:ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.querySelector(".masking").style.height = document.documentElement.clientHeight + "px"
    this.el.nativeElement.querySelector(".masking2").style.height = document.documentElement.clientHeight + "px"
  }

}
