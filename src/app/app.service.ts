import { Injectable } from '@angular/core';
import { Router } from '@angular/router' ; 

@Injectable()
export class AppService {

  constructor(public router:Router) { 
    
  }
ip(){
       //return "http://localhost"
      return "http://119.29.181.81"
     // return "http://www.solostore.cn"
    }

pictureip(){
  return "http://solostore.oss-cn-shanghai.aliyuncs.com/"
    }
proving(){
     if(sessionStorage.getItem("username") == null || sessionStorage.getItem("username")=="" || 
        sessionStorage.getItem("userpassword") == null || sessionStorage.getItem("userpassword")==""){
        sessionStorage.clear()
        this.router.navigate(['/login'])
      }
  }
}
