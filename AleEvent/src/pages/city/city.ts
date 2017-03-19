import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { RelationService } from '../../app/relations.service';
import { NavController, ModalController, Platform, NavParams, ViewController, MenuController } from 'ionic-angular';
import { Response } from '@angular/http';
import { City } from '../../app/city';
import { ModalContentPage } from '../../modal/modal';
import { EventPage } from '../event/event';
import { Cart } from '../../app/cart';
@Component({
    selector: 'page-city',
    templateUrl: 'city.html'
})
export class CityPage {

    cities: City[] = []
    data: Array<string> = []
    carts: Cart[];

    constructor(public menu: MenuController, public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController, private cartService: CartService, private relationService: RelationService) {

    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'city');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.cities);
        modal.present();
    }

    ngOnInit() {
        this.carts = this.cartService.getCart();
        console.log(this.carts);
        this.cities = this.relationService.setCity();
    }

    openEvent(item) {
        item.show = !item.show;
        if (!item.show) return;
        this.cities.forEach(function (item2, i, arr) {
            if (item2 != item) {
                item2.show = false;
            }
        });
        this.relationService.setCityId(item.id);
        this.cartService.createCart(item.id, 'city',item);
        this.navCtrl.push(EventPage);
    }

    onLink(url: string) {
        window.open(url);
    }

    openMenu(){
        this.menu.open();
    }
}
