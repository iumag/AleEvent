import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CityPage } from '../pages/city/city';
import { EventPage } from '../pages/event/event';
import { AboutPage } from '../pages/about/about';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService} from './http.service';
import {ModalContentPage} from '../modal/modal';

@NgModule({
  declarations: [
    MyApp,
      HomePage,
      AboutPage,
      EventPage,
      CityPage,
      ModalContentPage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      HttpModule,
      JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      HomePage,
      EventPage,
      AboutPage,
      CityPage,
      ModalContentPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, HttpService]
})
export class AppModule {}
