import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AboutusComponent } from './aboutus/aboutus.component';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { FaqComponent } from './faq/faq.component';
import { FeedComponent } from './feed/feed.component';
import { To64Pipe } from './to64.pipe';
import { SafeurlPipe } from './safeurl.pipe';
import { CapitalPipe } from './capital.pipe';
import { DogprofileComponent } from './dogprofile/dogprofile.component';
import { LoginComponent } from './login/login.component';
import { PersonprofileComponent } from './personprofile/personprofile.component';
import { NewAdComponent } from './newad/newad.component';
import { EditAdComponent} from "./edit-ad/edit-ad.component";
import { BreedPipe } from './breed.pipe';
import {RouteModuleModule} from "./route-module/route-module.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeletadComponent } from './deletad/deletad.component';
import { ErrorComponent } from './error/error.component';
import {RestDataService} from "./rest-data.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AgePipe } from './age.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { DbComponent } from './db/db.component';

@NgModule({
  declarations: [
    AboutusComponent,
    LayoutComponent,
    HomepageComponent,
    RegisterComponent,
    SuccessComponent,
    FaqComponent,
    FeedComponent,
    To64Pipe,
    SafeurlPipe,
    CapitalPipe,
    DogprofileComponent,
    LoginComponent,
    PersonprofileComponent,
    NewAdComponent,
    EditAdComponent,
    BreedPipe,
    DeletadComponent,
    ErrorComponent,
    AgePipe,
    DateFormatPipe,
    DbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouteModuleModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
