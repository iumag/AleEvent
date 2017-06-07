import { Component, OnInit, OnChanges } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { CartService } from './cart.service';
import { HomePage } from '../pages/home/home';
import { Cart,AllSum } from './cart';
import { Network } from 'ionic-native';
import { RelationService } from './relations.service';
import { Inject, ViewChild } from '@angular/core';
import { CityPage } from '../pages/city/city'
import { EventPage } from '../pages/event/event'
import { HotelPage } from '../pages/hotel/hotel'
import { TransportPage } from '../pages/transport/transport'
import { PhotographerPage } from '../pages/photographer/photographer'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav
  rootPage = HomePage;

  changePage(page) {
    switch (page) {
      case 'holiday':
        this.nav.push(HomePage);
        break;
      case 'city':
        this.nav.push(CityPage);
        break;
      case 'related_event':
        this.nav.push(EventPage);
        break;
      case 'hotel':
        this.nav.push(HotelPage);
        break;
      case 'photographer':
        this.nav.push(PhotographerPage);
        break;
      case 'transport':
        this.nav.push(TransportPage);
        break;
    }
    console.log(page)
  }

  carts: Cart[] = [];
  allSum: AllSum;

  ngOnInit() {
    this.carts = this.cart.getCart();
    this.allSum = this.cart.getAllSum()
  }


  deleteitem(item) {
    this.cart.deleteCart(item.entity_id, item.entity_type)
  }

  constructor(public alertCtrl: AlertController, public cart: CartService, platform: Platform, private relationService: RelationService) {
    platform.ready().then(() => {
      /*  let disconnectSubscription = Network.onDisconnect().subscribe(() => {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Network is none',
                buttons: ['OK']
            });
            alert.present();
            this.relationService.setEnableAccess(false);
        });*/




      // watch network for a connection
      /*let connectSubscription = Network.onConnect().subscribe(() => {
         let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Network is noneconnect',
                    buttons: ['OK']
                });
                alert.present();
                this.relationService.setEnableAccess(true);
      });*/



      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
