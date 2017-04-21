import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { RelationService } from '../../app/relations.service';
import { NavController, ModalController, Platform, NavParams, ViewController, MenuController, AlertController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Event } from '../../app/event';
import { ModalContentPage } from '../../modal/modal';
import { Cart } from '../../app/cart';
import { HotelPage } from '../hotel/hotel';
@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})
export class EventPage {

    events: Event[] = []
    data: Array<string> = []
    carts: Cart[];
    city_id: Number;
    holiday_id: Number;
    show_button: boolean;

    constructor(public alertCtrl: AlertController, public menu: MenuController, public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController, private cartService: CartService, private relationService: RelationService) {

    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'event');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.events);
        modal.present();
    }

    ngOnInit() {
        this.carts = this.cartService.getCart();
        this.events = this.relationService.setEvent();
    }

    selectEvent(item) {
        item.show = !item.show;
        this.show_button = true;
        if (item.show === false) {
            this.cartService.deleteCart(item.id, 'related_event');
            return;
        }
        this.cartService.createCart(item.id, 'related_event', item, 'Atrakcje');
        console.log(this.cartService.getCart());
    }

    isShow(value) {
        return value.show === true
    }

    openHotel() {
        if (this.events.filter(this.isShow).length <= 0) {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Choose item!',
                buttons: ['OK']
            });
            alert.present();
            return;
        }
        this.navCtrl.push(HotelPage);
    }

    onLink(url: string) {
        window.open(url);
    }

    openMenu() {
        this.menu.open();
    }
}
