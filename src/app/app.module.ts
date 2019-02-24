import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { OrderListComponent } from './profile/order-list/order-list.component';
import { AddressListComponent } from './profile/address-list/address-list.component';
import { TravelListComponent } from './travels/travel-list/travel-list.component';
import { TravelsComponent } from './travels/travels.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SearchComponent } from './home/search/search.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SecurityComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductsComponent,
    ProductListComponent,
    ProfileNavComponent,
    ProfileDetailComponent,
    OrderListComponent,
    AddressListComponent,
    TravelListComponent,
    TravelsComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
