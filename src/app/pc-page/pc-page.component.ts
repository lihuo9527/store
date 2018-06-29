import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-pc-page',
  templateUrl: './pc-page.component.html',
  styleUrls: ['./pc-page.component.css']
})
export class PcPageComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
     if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		  this.router.navigate(['/home'])
		}
  }

}
