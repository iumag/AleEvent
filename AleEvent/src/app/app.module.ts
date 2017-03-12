import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CityPage } from '../pages/city/city';
import { HotelPage } from '../pages/hotel/hotel';
import { PhotographerPage } from '../pages/photographer/photographer';
import { TransportPage } from '../pages/transport/transport';
import { EventPage } from '../pages/event/event';
import { AboutPage } from '../pages/about/about';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService } from './http.service';
import { CartService } from './cart.service';
import { RelationService } from './relations.service';
import { ModalContentPage } from '../modal/modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    EventPage,
    CityPage,
    HotelPage,
    TransportPage,
    PhotographerPage,
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
    HotelPage,
    TransportPage,
    PhotographerPage,
    ModalContentPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, HttpService, CartService, RelationService]
})
export class AppModule { }
