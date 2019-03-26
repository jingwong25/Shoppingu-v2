import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelComponent } from "./travels/travel/travel.component";
import { LandingComponent } from "./landing/landing.component";

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'travel', component: TravelComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
