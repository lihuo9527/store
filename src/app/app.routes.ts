import { RouterModule } from '@angular/router';
import { AuthGuard }                from './auth-guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDataComponent } from './user-data/user-data.component';
import { CommodityComponent } from './commodity/commodity.component';
import { UserOrderFormComponent } from './user-order-form/user-order-form.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { MyExpressComponent } from './my-express/my-express.component';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';
import { AddLocationComponent } from './add-location/add-location.component';
import {PcPageComponent} from './pc-page/pc-page.component';
import {PayComponent} from './pay/pay.component';
import {ViewLogisticsComponent} from './view-logistics/view-logistics.component';
import { ClassifyComponent } from './classify/classify.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { AddCommodityComponent } from './add-commodity/add-commodity.component';
import {AdminOrderFormComponent} from './admin-order-form/admin-order-form.component';

export const appRoutes=[
	 {
		 path:'',
		 redirectTo:'home',
		 pathMatch : "full"
	
     },

	 {
		path:'register',
		component:UserRegisterComponent
	 }
	,
	 {
		path:'login',
		component:UserLoginComponent
	 }
	,
	 {
		path:'home',
		component:HomeComponent
	 }
	 ,
	 {
		path:'commodity/:data',
		component:CommodityComponent
	 }
	  ,
	 {
		path:'user-data',
		component:UserDataComponent
	 }
	   ,
	 {
		path:'user-order-form',
		component:UserOrderFormComponent
	 }
	 ,
	 {
		path:'my-address',
		component:MyAddressComponent
	 }
	  ,
	 {
		path:'my-express',
		component:MyExpressComponent

	 }
	  ,
	 {
		path:'shopping-car',
		component:ShoppingCarComponent

	 }
	  ,
	 {
		path:'add-location',
		component:AddLocationComponent
	 }
	  ,
	 {
		path:'pc-page',
		component:PcPageComponent
	 }
	  ,
	 {
		path:'pay',
		component:PayComponent
	 }
	 ,
	 {
		path:'view-logistics/:data',
		component:ViewLogisticsComponent
	 }
	  ,
	 {
		path:'classify/:data',
		component:ClassifyComponent
	 }
	   ,
	 {
		path:'admin',
		component:AdminComponent,
		canActivate: [AuthGuard],
		children:[
			{path:"add-money",component:AddMoneyComponent},
            {path:"add-commodity",component:AddCommodityComponent},
			{path:"admin-order-form",component:AdminOrderFormComponent}
			]
	 }
	   ,
	 {
		path:'contact',
		component:ContactComponent
	 }

];