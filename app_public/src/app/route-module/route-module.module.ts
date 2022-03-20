import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "../homepage/homepage.component";
import {AboutusComponent} from "../aboutus/aboutus.component";
import {RegisterComponent} from "../register/register.component";
import {SuccessComponent} from "../success/success.component";
import {FaqComponent} from "../faq/faq.component";
import {FeedComponent} from "../feed/feed.component";
import {DogprofileComponent} from "../dogprofile/dogprofile.component";
import {PersonprofileComponent} from "../personprofile/personprofile.component";
import {NewAdComponent} from "../newad/newad.component";
import {DbComponent} from "../db/db.component";


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'success', component: SuccessComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'feed', component: FeedComponent},
  { path: 'ad/:id', component: DogprofileComponent },
  { path: 'personprofile', component: PersonprofileComponent},
  { path: 'newad', component: NewAdComponent},
  { path: 'db', component: DbComponent}
]

@NgModule({
  declarations: [],
  imports: [CommonModule,CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class RouteModuleModule { }
