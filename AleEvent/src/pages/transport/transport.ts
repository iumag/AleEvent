import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { RelationService } from '../../app/relations.service';
import { NavController, ModalController, Platform, NavParams, ViewController, MenuController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Transport } from '../../app/transport';
import { ModalContentPage } from '../../modal/modal';
import { Cart } from '../../app/cart';
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
        this.city_id = this.relationService.getCityId();
        this.httpService.getData('http://10.100.3.68/api/transport?column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1=' + this.city_id + '&search_query_2=')
            .subscribe((data: Response) => {
                let transportsList = data.json().model.data;
                for (let index in transportsList) {
                    let hotel = transportsList[index];
                    this.transports.push({ id: hotel.id, cost: hotel.cost, name: hotel.name, picture: hotel.picture, description: hotel.description, video: hotel.video, pictures: hotel.pictures, show: false });
                }
            });
    }

    openTransport(item) {
        item.show = !item.show;
        if (!item.show) return;
        this.transports.forEach(function (item2, i, arr) {
            if (item2 != item) {
                item2.show = false;
            }
        });
        this.cartService.createCart(item.id, 'transport', item);
        //this.navCtrl.push(EventPage);
    }

    openMenu() {
        this.menu.open();
    }

}