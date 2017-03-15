import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { CartService } from './cart.service';
import { HomePage } from '../pages/home/home';
import { Cart } from './cart';


@Component({
  templateUrl: 'app.html'
})
export class MyApp{
    rootPage = HomePage;

     carts: Cart[] = [];

     ngOnInit(){
       this.carts  = this.cart.getCart();
     }

     deleteitem(item){
        this.cart.deleteCart(item.entity_id, item.entity_type)
     }

  constructor(public cart: CartService, platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

}
