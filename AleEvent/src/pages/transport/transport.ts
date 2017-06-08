import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { RelationService } from '../../app/relations.service';
import { NavController, ModalController, Platform, NavParams, ViewController, MenuController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Transport } from '../../app/transport';
import { ModalContentPage } from '../../modal/modal';
import { Cart } from '../../app/cart';
import { FormPage } from '../form/form';
@Component({
    selector: 'page-transport',
    templateUrl: 'transport.html'
})

export class TransportPage {
    transports: Transport[] = [];
    data: Array<string> = []
    carts: Cart[];
    city_id: Number;

    constructor(public menu: MenuController, public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController, private cartService: CartService, private relationService: RelationService) {
    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'transport');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.transports);
        modal.present();
    }

    ngOnInit() {
        this.carts = this.cartService.getCart();
        this.transports = this.relationService.setTransport();
    }

    openTransport(item) {
        if (item) {
            item.show = !item.show;
            if (!item.show) return;
            this.transports.forEach(function (item2, i, arr) {
                if (item2 != item) {
                    item2.show = false;
                }
            });

            this.cartService.createCart(item.id, 'transport', item, 'Transport');
        }
        this.navCtrl.push(FormPage);
    }

    openMenu() {
        this.menu.open();
    }

}