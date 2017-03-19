import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { RelationService } from '../../app/relations.service';
import { NavController, ModalController, Platform, NavParams, ViewController, MenuController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Hotel } from '../../app/hotel';
import { ModalContentPage } from '../../modal/modal';
import { Cart } from '../../app/cart';
import { PhotographerPage } from '../photographer/photographer';
@Component({
    selector: 'page-hotel',
    templateUrl: 'hotel.html'
})

export class HotelPage {
    hotels: Hotel[] = [];
    data: Array<string> = []
    carts: Cart[];
    city_id: Number;

    constructor(public menu: MenuController, public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController, private cartService: CartService, private relationService: RelationService) {
    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'hotel');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.hotels);
        modal.present();
    }

    ngOnInit() {
        this.carts = this.cartService.getCart();
        this.hotels = this.relationService.setHotel();
    }

    openTransport(item) {
        item.show = true
        this.hotels.forEach(function (item2, i, arr) {
            if (item2 != item) {
                item2.show = false;
            }
        });
        this.cartService.createCart(item.id, 'hotel', item);
        this.navCtrl.push(PhotographerPage);
    }

    openMenu(){
        this.menu.open();
    }

}