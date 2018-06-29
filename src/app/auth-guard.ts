import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AppService } from './app.service';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthGuard implements CanActivate {
  	constructor(
  		public router: Router,
  		public appservice: AppService,
		public http: Http) {

  	}

canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<boolean> | boolean{

return new Promise<Boolean>((resolve, reject) => {
	let headers  = new Headers()
    let creds = "username=" + sessionStorage.getItem("username") + "&userpassword=" + sessionStorage.getItem("userpassword")
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post(this.appservice.ip() + '/serve/admin_proving.php', creds, {headers: headers} ).map(res => res.text()).subscribe(data=>{
	let arr = data
	if(arr =="true"){
       resolve(true);
	  }else{
	   resolve(false);
	  }
    });      
  }); 
 }
}