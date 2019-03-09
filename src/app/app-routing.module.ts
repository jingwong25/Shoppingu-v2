import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelComponent } from "./travels/travel/travel.component";

const routes: Routes = [
  { path: 'travel', component: TravelComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
