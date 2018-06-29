import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {appRoutes} from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {HashLocationStrategy , LocationStrategy} from '@angular/common';
import { SlideImgDirective } from './slide-img/slide-img-directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';  
import { IndexNavComponent } from './index-nav/index-nav.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AlertModule } from 'ng2-bootstrap/alert';
import { CommodityComponent } from './commodity/commodity.component';
import { SlideImgComponent } from './slide-img/slide-img.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserOrderFormComponent } from './user-order-form/user-order-form.component';
import { TitleComponent } from './title/title.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { MyExpressComponent } from './my-express/my-express.component';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';
import { CityComponent } from './city/city.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { PcPageComponent } from './pc-page/pc-page.component';
import { PayComponent } from './pay/pay.component';
import { MaskingOutComponent } from './masking-out/masking-out.component';
import {AppService} from './app.service';
import { AlertComponent } from './alert/alert.component';
import { ViewLogisticsComponent } from './view-logistics/view-logistics.component';
import { ClassifyComponent } from './classify/classify.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { AddCommodityComponent } from './add-commodity/add-commodity.component';
import { AdminOrderFormComponent } from './admin-order-form/admin-order-form.component';
import { AuthGuard } from './auth-guard';
@NgModule({
  declarations: [
    AppComponent,
    SlideImgDirective,
    HomeComponent,
    IndexNavComponent,
    UserRegisterComponent,
    UserLoginComponent,
    CommodityComponent,
    SlideImgComponent,
    UserDataComponent,
    UserOrderFormComponent,
    TitleComponent,
    MyAddressComponent,
    MyExpressComponent,
    ShoppingCarComponent,
    CityComponent,
    AddLocationComponent,
    PcPageComponent,
    PayComponent,
    MaskingOutComponent,
    AlertComponent,
    ViewLogisticsComponent,
    ClassifyComponent,
    AdminComponent,
    ContactComponent,
    AddMoneyComponent,
    AddCommodityComponent,
    AdminOrderFormComponent
  

   
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule

  ],
  providers:[AppService,AuthGuard,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
