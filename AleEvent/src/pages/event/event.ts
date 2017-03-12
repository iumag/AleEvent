import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { RelationService } from '../../app/relations.service';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Response} from '@angular/http';
import { Event } from '../../app/event';
import {ModalContentPage} from '../../modal/modal';
import { Cart } from '../../app/cart';
import {HotelPage} from  '../hotel/hotel';
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

    constructor(public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController,private cartService: CartService,  private relationService : RelationService) {

    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'event');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.events);
        modal.present();
    }

    ngOnInit() {
        this.carts = this.cartService.getCart();
        this.city_id = this.relationService.getCityId();
        this.holiday_id = this.relationService.getHolidayId();
        this.httpService.getData('http://10.100.3.68/api/related_event?per_page=10000&column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1='+this.city_id+'&search_query_2=&search_query_3='+this.holiday_id+'&search_column2=holiday_id')
            .subscribe((data: Response) => {
                let eventsList = data.json().model.data;
                for (let index in eventsList) { 
                    let event = eventsList[index];
                    this.events.push({id : event.id, city: event.city, city_id: event.city_id, cost: event.cost, event: event.event, event_id: event.event_id, holiday: event.holiday, holiday_id: event.holiday_id, show:false });
                }
            });
    }

    selectEvent(item: Event) {
            item.show = !item.show;
            if(item.show === false) {
                this.cartService.deleteCart(item.id, 'event');
                return;
            }
           this.cartService.createCart(item.id,'event');
           console.log(this.cartService.getCart());
    }

    openHotel(){
        this.navCtrl.push(HotelPage);
    }

    onLink(url: string) {
        window.open(url);
    }
}
